// main tools
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// gql
import { useQuery } from '@apollo/client'
import GET_COACHEE_AGENDA from 'lib/queries/Coachee/getAgenda.gql'
import GET_COACH_AVAILABILITY from 'lib/queries/Coach/getAvailability.gql'

// components
import { Layout } from 'components/organisms/Layout'
import { CoachEvent } from 'components/atoms/CoachEvent'
import { coacheeAgendaTemplate } from 'components/atoms/CoacheeAgendaTemplate'

// prime components
import { Calendar } from 'primereact/calendar'
import { Skeleton } from 'primereact/skeleton'
import { addLocale } from 'primereact/api'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// utils
import { formatDate, microServices } from 'commons'

// styles
import classes from 'styles/coachAgenda/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { CalendarLocaleOptions } from 'commons/calendarLocaleOptions'
import { CoacheeEvent } from 'components/atoms/CoacheeEvent'

const AgendaPage: NextPage = () => {
  const [appointments, setAppointments] = useState<any[] | undefined>(undefined)
  const [satRealized, setSatRealized] = useState<any[] | undefined>(undefined)
  const [coachAvailability, setCoachAvailability] = useState<any[] | undefined>(
    undefined
  )
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { query, locale } = useRouter()

  addLocale('es', CalendarLocaleOptions)

  useQuery(GET_COACHEE_AGENDA, {
    context: { ms: microServices.backend },
    variables: { from: '2022/02/15', to: '2022/02/28' },
    onCompleted: (data) => {
      setAppointments(data.getCoacheeAgenda.appointments)
      setSatRealized(data.getCoacheeAgenda.satsRealized)
    },
    onError: (err) => {
      setAppointments([])
      setSatRealized([])
    },
  })

  useQuery(GET_COACH_AVAILABILITY, {
    context: { ms: microServices.backend },
    variables: { coachAgendaId: 1, from: '2022/02/15', to: '2022/02/28' },
    onCompleted: (data) => setCoachAvailability(data.getCoachAvailability),
    onError: (err) => setCoachAvailability([]),
  })

  return (
    <Layout>
      <Container className='my-5'>
        <h1 className={classes.title}>Próximos eventos</h1>
        <Row className={classes.agenda}>
          <Col className='p-2' xs={12} md={6} lg={7}>
            <div className={classes.availability}>
              <Calendar
                inline
                selectionMode='multiple'
                className={classes.availability_container}
                panelClassName={classes.availability_calendar}
                locale={locale}
                dateFormat='dd/mm/yy'
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
                <Row className='justify-content-center'>
                  {appointments
                    .filter((item) => {
                      const formatedDate = formatDate(item.startDate)
                      const isFromDate =
                        selectedDate?.getDate() === formatedDate.getDate() &&
                        selectedDate?.getMonth() === formatedDate.getMonth() &&
                        selectedDate?.getFullYear() ===
                          formatedDate.getFullYear()

                      return isFromDate
                    })
                    .map((item, idx) => (
                      <Col key={idx} xs={12} lg={8}>
                        <CoacheeEvent {...item} />
                      </Col>
                    ))}
                </Row>
              )}
            </div>
          </Col>
          <Col xs={12} md={6} lg={5}>
            {coachAvailability === undefined
              ? [0, 1].map((idx) => (
                  <Skeleton
                    key={idx}
                    width='100%'
                    height='11rem'
                    className='my-2'
                  />
                ))
              : coachAvailability
                  .slice(0, 3)
                  .map((item, idx) => <CoachEvent key={idx} {...item} />)}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }
  // if (!session.user.coach)
  //   return {
  //     redirect: { destination: '/signup/coachee/steps', permanent: false },
  //     props: {},
  //   }

  return { props: {} }
}

export default AgendaPage
