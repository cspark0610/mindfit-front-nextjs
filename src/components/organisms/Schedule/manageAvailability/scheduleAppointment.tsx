// main tools
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef } from 'react'

// gql
import GET_COACH from 'lib/queries/Coach/getById.gql'
import { useQuery, useLazyQuery, useMutation } from '@apollo/client'
import GET_AVAILABILITY_RANGES from 'lib/queries/Coach/getAvailability.gql'
import SCHEDULE_APPOINTMENT from 'lib/mutations/Coachee/scheduleAppointment.gql'

// utils
import { microServices } from 'commons'

// components
import { MonthNavigator } from 'components/atoms/CoacheeAgendaTemplate/monthNavigator'

// bootstrap components
import { Container, Button, Col, Row, Modal } from 'react-bootstrap'

// prime components
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'
import { CoachDataType } from 'types/models/Coach'
import { RangeDataType } from 'types/models/Agenda'
import { CalendarChangeParams } from 'primereact/calendar'

type ScheduleAppointmentProps = {
  coachId: number
  coachAgendaId: number
}

type RangeType = {
  date: string
  availability: RangeDataType[]
}

export const ScheduleAppointment: FC<ScheduleAppointmentProps> = ({
  coachId,
  coachAgendaId,
}) => {
  const { locale } = useRouter()
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
    onCompleted: (data) =>
      setAvailabilityRange(data?.getCoachAvailability as RangeType[]),
  })
  const [scheduleAppointment] = useMutation(SCHEDULE_APPOINTMENT, {
    context: { ms: microServices.backend },
    onCompleted: (data) => console.log(data),
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

    console.log('AVAILABILITY')
    console.log('NORMAL', selectedDate)
    console.log('NORMAL', to)
    console.log('ISO STRING', selectedDate?.toISOString())
    console.log('ISO STRING', to.toISOString())

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
        const formatedDate = range.date.split('T')[0]
        const formatedSelectedDate = selectedDate?.toISOString().split('T')[0]
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
            <Row className='mb-5 flex-row-reverse'>
              <Col className='mt-3' xs={12}></Col>
            </Row>
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
