// main tools
import { useState } from 'react'
import { useRouter } from 'next/router'

// prime components
import { addLocale } from 'primereact/api'
import { Calendar } from 'primereact/calendar'
import { Skeleton } from 'primereact/skeleton'

// bootstrap components
import { Button, Col, Row, Modal } from 'react-bootstrap'

// components
import { ScheduledAppointmentCard } from 'components/atoms/ScheduledAppointmentCard'
import { coacheeAgendaTemplate } from 'components/atoms/CoacheeAgendaTemplate/multiple'
import { ScheduleAppointment } from 'components/organisms/Schedule/manageAvailability/scheduleAppointment'

// gql
import { useQuery } from '@apollo/client'
import GET_COACH_AGENDA from 'lib/queries/Coach/getAgenda.gql'

// utils
import { formatDate, microServices } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'
import { CalendarLocaleOptions } from 'commons/calendarLocaleOptions'

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
  const [coachAgendaId, setCoachAgendaId] = useState<number | undefined>(
    undefined
  )

  useQuery(GET_COACH_AGENDA, {
    variables: { id: coachee.assignedCoach?.id },
    context: { ms: microServices.backend },
    onCompleted: (data) => setCoachAgendaId(data.findCoachById.coachAgenda.id),
  })

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
                    const formatedDate = formatDate(item.startDate)
                    const isFromDate =
                      selectedDate?.getDate() === formatedDate.getDate() &&
                      selectedDate?.getMonth() === formatedDate.getMonth() &&
                      selectedDate?.getFullYear() === formatedDate.getFullYear()

                    return isFromDate
                  })
                  .map((item, idx) => (
                    <Col key={idx} xs={12} lg={8}>
                      <ScheduledAppointmentCard {...item} />
                    </Col>
                  ))}
              </Row>
            )}
            <Row className='mb-5 flex-row-reverse'>
              <Col className='mt-3' xs={12}>
                <p className={classes.label}>{content.availabilityLabel} 1/2</p>
              </Col>
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
            coachId={coachee.assignedCoach?.id as number}
            coachAgendaId={coachAgendaId as number}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
