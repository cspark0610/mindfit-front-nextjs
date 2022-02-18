// main tools
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// gql
import { useQuery } from '@apollo/client'
import { initializeApolloClient } from 'lib/apollo'
import GET_COACHEE_AGENDA from 'lib/queries/Coachee/getAgenda.gql'
import GET_COACH_AVAILABILITY from 'lib/queries/Coach/getAvailability.gql'
import GET_PAGE_CONTENT from 'lib/strapi/queries/UserSchedule/page.gql'

// components
import { Layout } from 'components/organisms/Layout'
import { CoachEvent } from 'components/atoms/CoachEvent'
import { coacheeAgendaTemplate } from 'components/atoms/CoacheeAgendaTemplate'

// prime components
import { Calendar } from 'primereact/calendar'
import { Skeleton } from 'primereact/skeleton'
import { addLocale } from 'primereact/api'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'

// utils
import { formatDate, microServices } from 'commons'

// styles
import classes from 'styles/coachAgenda/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { CalendarLocaleOptions } from 'commons/calendarLocaleOptions'
import { CoacheeEvent } from 'components/atoms/CoacheeEvent'
import { GetSSPropsType } from 'types'

const AgendaPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
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
        <h1 className={classes.title}>{content.title}</h1>
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
                <Row className='w-100 justify-content-center'>
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
                        {console.log(item)}
                        <CoacheeEvent {...item} />
                      </Col>
                    ))}
                  <Col xs={8} className='mt-3 text-end'>
                    <strong className={classes.availability_quantity}>
                      {content.availabilityLabel} 1/2
                    </strong>
                    <Button className={classes.button}>
                      {content.submitButton.label}
                    </Button>
                  </Col>
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
                  .map((item, idx) => (
                    <CoachEvent
                      key={idx}
                      content={content.scheduleButton}
                      {...item}
                    />
                  ))}
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

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: GET_PAGE_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.coacheeSchedule.data.attributes } }
}

export default AgendaPage
