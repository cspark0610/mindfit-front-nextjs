// main tools
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import dayjs from 'dayjs'

// gql
import SCHEDULE_APPOINTMENT from 'lib/mutations/Coachees/scheduleAppointment.gql'
import GET_AVAILABILITY_RANGES from 'lib/queries/Coach/getAvailability.gql'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import GET_COACH from 'lib/queries/Coach/getById.gql'

// utils
import { microServices } from 'commons'
import { errors } from 'utils/errors'

// components
import { MonthNavigator } from 'components/atoms/CoacheeAgendaTemplate/monthNavigator'

// bootstrap components
import { Container, Button, Col, Row } from 'react-bootstrap'

// prime components
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { CalendarChangeParams } from 'primereact/calendar'
import { RangeDataType } from 'types/models/Agenda'
import { CoachDataType } from 'types/models/Coach'
import { FC } from 'react'

type ScheduleAppointmentProps = {
  content: any
  coachId: number
  coachAgendaId: number
}

type RangeType = {
  date: string
  availability: RangeDataType[]
}

export const ScheduleAppointment: FC<ScheduleAppointmentProps> = ({
  content,
  coachId,
  coachAgendaId,
}) => {
  const { locale } = useRouter()
  const [error, setError] = useState('')
  const calendar = useRef<Calendar>(null)
  const intervals = [{ label: '60 minutos', value: 60 }]
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null)
  const [coach, setCoach] = useState<CoachDataType | undefined>(undefined)
  const [selectedRanges, setSelectedRanges] = useState<RangeDataType[]>([])
  const [selectedInterval, setSelectedInterval] = useState<Date | null>(null)
  const [selectedAvailability, setSelectedAvailability] =
    useState<RangeDataType | null>(null)
  const [availabilityRange, setAvailabilityRange] = useState<
    RangeType[] | undefined
  >(undefined)

  useQuery(GET_COACH, {
    variables: { id: coachId },
    context: { ms: microServices.backend },
    onCompleted: (data) => setCoach(data.findCoachById),
  })
  const [getAvailabilityRanges] = useLazyQuery(GET_AVAILABILITY_RANGES, {
    context: { ms: microServices.backend },
    onCompleted: (data) => {
      const getCoachAvailability: RangeType[] = [...data.getCoachAvailability]
      const setRanges: RangeType[] = []

      getCoachAvailability.forEach((range) => {
        const rangeAvailability = [...range.availability]
        rangeAvailability.sort((prev, next) => {
          if (prev.from > next.from) return 1
          else if (prev.from < next.from) return -1
          return 0
        })
        setRanges.push({ date: range.date, availability: rangeAvailability })
      })

      setAvailabilityRange(setRanges)
    },
  })
  const [scheduleAppointment] = useMutation(SCHEDULE_APPOINTMENT, {
    context: { ms: microServices.backend },
    onCompleted: (data) => console.log(data),
    onError: () => setError(errors.maxAppointmentsPerMonth),
  })

  const handleChangeDate = (ev: CalendarChangeParams) =>
    setSelectedDate(ev.value as Date)

  const handleScheduleAppointment = () => {
    const fromHours = selectedAvailability?.from?.split(':')[0]
    const fromMinutes = selectedAvailability?.from?.split(':')[1]
    const toHours = selectedAvailability?.to?.split(':')[0]
    const toMinutes = selectedAvailability?.to?.split(':')[1]
    const to = new Date((selectedDate as Date)?.getTime())

    selectedDate?.setHours(parseInt(fromHours as string))
    selectedDate?.setMinutes(parseInt(fromMinutes as string))
    to?.setHours(parseInt(toHours as string))
    to?.setMinutes(parseInt(toMinutes as string))

    scheduleAppointment({
      variables: {
        data: {
          remarks: 'test',
          startDate: selectedDate?.toISOString(),
          endDate: to?.toISOString(),
        },
      },
    })
  }

  useEffect(() => {
    if (calendar.current) setSelectedMonth(calendar.current.state.viewDate)
  }, [calendar])

  useEffect(() => {
    if (selectedMonth) {
      const lastDayOfMonth = new Date(
        new Date().getFullYear(),
        selectedMonth.getMonth() + 1,
        0
      )

      getAvailabilityRanges({
        variables: { coachAgendaId, from: selectedMonth, to: lastDayOfMonth },
      })
    }
  }, [coachAgendaId, selectedMonth, getAvailabilityRanges])

  useEffect(() => {
    if (availabilityRange) {
      const availableDate = availabilityRange.find((range) => {
        const formatedDate = dayjs(range.date).format('DD-MM-YYYY')
        const formatedSelectedDate = dayjs(selectedDate).format('DD-MM-YYYY')

        return formatedDate === formatedSelectedDate
      })

      setSelectedRanges(availableDate?.availability as RangeDataType[])
    }
  }, [availabilityRange, selectedDate])

  return (
    <Container>
      <Row className='justify-content-center'>
        <Image
          src='/assets/images/avatar.png'
          width={100}
          height={100}
          alt='user avatar'
        />
        <h3 className={classes.subtitle}>Reunión con {coach?.user?.name}</h3>
      </Row>
      <Row className={classes.agenda}>
        <Col xs={6}>
          <div className={classes.availability}>
            <Calendar
              inline
              monthNavigator
              ref={calendar}
              locale={locale}
              minDate={new Date()}
              dateFormat='dd/mm/yy'
              value={selectedDate as Date}
              onChange={handleChangeDate}
              className={classes.availability_container}
              monthNavigatorTemplate={(ev) => (
                <MonthNavigator
                  monthSelector={ev}
                  setSelectedMonth={setSelectedMonth}
                  calendar={calendar.current as Calendar}
                />
              )}
              panelClassName={`${classes.availability_calendar_disableArrows} ${classes.availability_calendar}`}
            />
            {error && (
              <Row className='mb-5 flex-row-reverse'>
                <Col className='mt-3' xs={12}>
                  <p className={classes.label}>{error}</p>
                </Col>
              </Row>
            )}
          </div>
        </Col>
        <Col className='px-5' xs={6}>
          <p className={classes.label}>Duración de la reunión</p>
          <Dropdown
            optionLabel='label'
            optionValue='value'
            options={intervals}
            value={selectedInterval}
            className={classes.input}
            panelClassName={classes.zindex}
            onChange={(ev) => setSelectedInterval(ev.value)}
          />
          <p className={`my-4 ${classes.label}`}>¿A qué hora puedes?</p>
          <Row className='justify-content-center'>
            {selectedInterval &&
              selectedRanges?.map((range, idx) => (
                <Button
                  key={idx}
                  variant={`${
                    selectedAvailability === range
                      ? 'primary'
                      : 'outline-primary'
                  }`}
                  className={classes.button}
                  onClick={() => setSelectedAvailability(range)}>
                  {range.from} - {range.to}
                </Button>
              ))}
            <Col className='mt-4' xs={9}>
              <Button
                onClick={handleScheduleAppointment}
                className={classes.button}>
                Guardar y agendar
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
