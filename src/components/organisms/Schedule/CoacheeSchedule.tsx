// main tools
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

// prime components
import { Calendar } from 'primereact/calendar'
import { Skeleton } from 'primereact/skeleton'
import { addLocale } from 'primereact/api'

// bootstrap components
import { Button, Col, Row, Modal } from 'react-bootstrap'

// components
import { ScheduleAppointment } from 'components/organisms/Schedule/manageAvailability/scheduleAppointment'
import { coacheeAgendaTemplate } from 'components/atoms/CoacheeAgendaTemplate/multiple'
import { ScheduledAppointmentCard } from 'components/atoms/ScheduledAppointmentCard'

// utils
import { formatDate, sortingAscending } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { CalendarLocaleOptions } from 'commons/calendarLocaleOptions'
import { CoacheeDataType } from 'types/models/Coachee'
import { FC } from 'react'

type CoacheeScheduleProps = {
  coachee: CoacheeDataType
  content: any
}

export const CoacheeSchedule: FC<CoacheeScheduleProps> = ({
  coachee,
  content,
}) => {
  const { locale } = useRouter()
  const calendar = useRef<Calendar>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const coachAgendaId = coachee.assignedCoach?.coachAgenda?.id as number
  const [showAvailabilityRange, setShowAvailabilityRange] = useState(false)
  const coacheeAppointments = coachee.coachAppointments
    ? [...coachee.coachAppointments]
    : []

  const handleShowAvailabilityRange = () =>
    setShowAvailabilityRange(!showAvailabilityRange)

  addLocale('es', CalendarLocaleOptions)

  useEffect(() => {
    if (calendar.current) {
      calendar.current.setState({
        ...calendar.current.state,
        viewDate: new Date(),
      })
    }
  }, [])

  return (
    <>
      <h1 className={classes.title}>{content.title}</h1>
      <Row className={classes.agenda}>
        <Col className='p-2' xs={12} md={6} lg={7}>
          <div className={classes.availability}>
            <Calendar
              inline
              ref={calendar}
              locale={locale}
              dateFormat='dd/mm/yy'
              selectionMode='multiple'
              className={classes.availability_container}
              panelClassName={classes.availability_calendar}
              dateTemplate={(ev) =>
                coacheeAgendaTemplate(ev, selectedDate, setSelectedDate)
              }
              value={coachee.coachAppointments?.map(({ startDate }) =>
                formatDate(startDate)
              )}
            />
            {coachee.coachAppointments === undefined ? (
              [0, 1].map((idx) => (
                <Skeleton
                  key={idx}
                  width='100%'
                  height='11rem'
                  className='my-2'
                />
              ))
            ) : (
              <Row className='w-100 justify-content-center'>
                {coachee.coachAppointments
                  ?.filter((item) => {
                    const formatedDate = dayjs(formatDate(item.startDate))
                    const formatedSelectedDate = dayjs(selectedDate)

                    return (
                      formatedDate.format('MM/DD/YYYY') ===
                      formatedSelectedDate.format('MM/DD/YYYY')
                    )
                  })
                  .map((item, idx) => (
                    <Col key={idx} xs={12} lg={8}>
                      <ScheduledAppointmentCard
                        content={content}
                        actions
                        {...item}
                        role='coachee'
                      />
                    </Col>
                  ))}
              </Row>
            )}
            <Row className='mb-5 flex-row-reverse'>
              {!coachAgendaId ? (
                <Skeleton width='100%' height='30px' />
              ) : (
                <Button
                  onClick={handleShowAvailabilityRange}
                  className={classes.button}>
                  {content.submitButton.label}
                </Button>
              )}
            </Row>
          </div>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <Row
            className={`w-100 justify-content-center ${classes.appointments}`}>
            {coacheeAppointments
              ?.sort((prev, next) => sortingAscending(prev, next, 'startDate'))
              .map((item, idx) => (
                <Col key={idx} xs={12}>
                  <ScheduledAppointmentCard
                    content={content}
                    preview
                    {...item}
                  />
                </Col>
              ))}
          </Row>
        </Col>
      </Row>

      <Modal
        centered
        size='xl'
        className={classes.modal}
        show={showAvailabilityRange}
        onHide={handleShowAvailabilityRange}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body>
          <ScheduleAppointment
            content={content}
            showModal={setShowAvailabilityRange}
            coachAgendaId={coachAgendaId as number}
            coachId={coachee.assignedCoach?.id as number}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
