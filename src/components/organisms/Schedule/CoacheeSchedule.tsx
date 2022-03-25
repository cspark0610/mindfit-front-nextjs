// main tools
import { useRouter } from 'next/router'
import { useState } from 'react'
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
import { formatDate } from 'commons'

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showAvailabilityRange, setShowAvailabilityRange] = useState(false)
  const coachAgendaId = coachee.assignedCoach?.coachAgenda?.id as number

  const handleShowAvailabilityRange = () =>
    setShowAvailabilityRange(!showAvailabilityRange)

  addLocale('es', CalendarLocaleOptions)

  return (
    <>
      <h1 className={classes.title}>{content.title}</h1>
      <Row className={classes.agenda}>
        <Col className='p-2' xs={12} md={6} lg={7}>
          <div className={classes.availability}>
            <Calendar
              inline
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
                  Solicitar cita con el coach
                </Button>
              )}
            </Row>
          </div>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <Row className='mt-2 w-100 justify-content-center'>
            {coachee.coachAppointments?.map((item, idx) => (
              <Col key={idx} xs={12}>
                <ScheduledAppointmentCard preview {...item} />
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
            coachId={coachee.assignedCoach?.id as number}
            coachAgendaId={coachAgendaId as number}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
