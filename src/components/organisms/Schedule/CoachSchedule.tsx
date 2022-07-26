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
import { GeneralAvailability } from 'components/organisms/Schedule/manageAvailability/GeneralAvailability'
import { SingleAvailability } from 'components/organisms/Schedule/manageAvailability/singleAvailability'
import { coacheeAgendaTemplate } from 'components/atoms/CoacheeAgendaTemplate/multiple'
import { ScheduledAppointmentCard } from 'components/atoms/ScheduledAppointmentCard'

// gql
import GET_APPOINTMENTS from 'lib/queries/Coach/getAppointments.gql'
import { useQuery } from '@apollo/client'

// utils
import { formatDate, microServices, sortingAscending } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { CalendarLocaleOptions } from 'commons/calendarLocaleOptions'
import { AgendaDataType } from 'types/models/Agenda'
import { CoachDataType } from 'types/models/Coach'
import { FC } from 'react'

type CoachScheduleProps = {
  coach: CoachDataType
  content: any
}

export const CoachSchedule: FC<CoachScheduleProps> = ({ coach, content }) => {
  const { locale } = useRouter()
  const calendar = useRef<Calendar>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [appointments, setAppointments] = useState<any[] | undefined>([])
  const [showManageGeneralAvailability, setShowManageGeneralAvailability] =
    useState(false)
  const [showManageSingleAvailability, setShowManageSingleAvailability] =
    useState(false)

  useQuery(GET_APPOINTMENTS, {
    context: { ms: microServices.backend },
    variables: { id: coach.coachAgenda?.id },
    onCompleted: (data) => {
      const orderedAppointments = [
        ...data.findCoachAgendaById.coachAppointments,
      ]
      orderedAppointments.sort((prev: any, next: any) =>
        sortingAscending(prev, next, 'startDate')
      )
      setAppointments(orderedAppointments)
    },
  })

  const handleManageAvailability = () =>
    setShowManageGeneralAvailability(!showManageGeneralAvailability)
  const handleManageSingleAvailability = () =>
    setShowManageSingleAvailability(!showManageSingleAvailability)

  addLocale('es', CalendarLocaleOptions)

  useEffect(() => {
    if (calendar.current) {
      calendar.current.setState({
        ...calendar.current.state,
        viewDate: new Date(),
      })
    }
  }, [appointments])

  return (
    <>
      <h1 className={classes.title}>{content.title}</h1>
      {coach.coachAgenda?.outOfService && (
        <span className={classes.outOfService}>
          {content.outServiceButton.label}
        </span>
      )}
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
              value={appointments?.map(({ startDate }) =>
                formatDate(startDate)
              )}
            />
            {appointments === undefined ? (
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
                {appointments
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
                        role='coach'
                      />
                    </Col>
                  ))}
              </Row>
            )}
          </div>
        </Col>
        <Col xs={12} md={6} lg={5}>
          <h2 className={classes.title}>{content.availabilityLabel}</h2>
          <p>{content.description}</p>
          <Row className='justify-content-center align-items-center mb-5'>
            <Col xs={5}>
              <Button
                disabled={
                  !!!selectedDate ||
                  dayjs(selectedDate).diff(dayjs(), 'hours') < -23
                }
                className={classes.button}
                onClick={handleManageSingleAvailability}>
                {content.availabilityDayButton.label}
              </Button>
            </Col>
            <Col xs={5}>
              <Button
                className={classes.button}
                onClick={handleManageAvailability}>
                {content.availabilityButton}
              </Button>
            </Col>
          </Row>
          {appointments === undefined ? (
            [0, 1].map((idx) => (
              <Skeleton
                key={idx}
                width='100%'
                height='11rem'
                className='my-2'
              />
            ))
          ) : (
            <Row
              className={`w-100 justify-content-center ${classes.appointments}`}>
              {appointments.map((item, idx) => (
                <Col key={idx} xs={12}>
                  <ScheduledAppointmentCard
                    content={content}
                    preview
                    {...item}
                    role='coach'
                  />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
      <Modal
        centered
        size='lg'
        className={classes.modal}
        show={showManageSingleAvailability}
        onHide={handleManageSingleAvailability}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body>
          <SingleAvailability
            content={content}
            selectedDate={selectedDate}
            showModal={setShowManageSingleAvailability}
            agenda={coach.coachAgenda as AgendaDataType}
          />
        </Modal.Body>
      </Modal>

      <Modal
        centered
        size='lg'
        className={classes.modal}
        show={showManageGeneralAvailability}
        onHide={handleManageAvailability}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body>
          <GeneralAvailability
            content={content}
            showModal={setShowManageGeneralAvailability}
            agenda={coach.coachAgenda as AgendaDataType}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
