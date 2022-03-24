// main tools
import { getSession } from 'next-auth/react'

// components
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { Layout } from 'components/organisms/Layout'

// motion
import { ContainerMotion } from 'components/atoms/AnimateComponents'
import { viewportFadeIn } from 'commons/animations'

// gql
import GET_ASSIGNED_COACHEES from 'lib/queries/Coach/getAssignedCoachees.gql'
import GET_CONTENT from 'lib/strapi/queries/Coach/dashboardContent.gql'
import { createApolloClient } from 'lib/apolloClient'
import { initializeApolloClient } from 'lib/apollo'

// utils
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// bootstrap components
import { Tabs, Tab, Container, Row } from 'react-bootstrap'

// styles
import classes from 'styles/coachDashboard/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { CoacheeDataType } from 'types/models/Coachee'
import { GetSSPropsType } from 'types'

const CoachDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  assignedCoachees,
}) => (
  <Layout>
    <Container className={classes.container}>
      <Tabs className={classes.tabs} defaultActiveKey='all'>
        <Tab
          eventKey='all'
          title={content.allTabLabel}
          tabClassName={classes.tabs_item}>
          <ContainerMotion className={classes.container} {...viewportFadeIn}>
            <Row>
              <h2 className={classes.title}>{content.allCoacheesLabel}</h2>
              {assignedCoachees.getCoachProfile.assignedCoachees.length ===
              0 ? (
                <p className='mt-4'>No han sido asignados coachees</p>
              ) : (
                assignedCoachees.getCoachProfile.assignedCoachees.map(
                  (coachee: CoacheeDataType) => (
                    <CoacheeProfileCard
                      key={coachee.id}
                      coachee={coachee}
                      content={content.coacheeCard.data.attributes}
                    />
                  )
                )
              )}
            </Row>
          </ContainerMotion>
        </Tab>
        <Tab
          eventKey='resume'
          title={content.summaryTabLabel}
          tabClassName={classes.tabs_item}>
          <ContainerMotion className={classes.container} {...viewportFadeIn}>
            {content.summaryCategories.map((category: any) => (
              <Row className='my-5' key={category.label}>
                <h2 className={classes.title}>{category.label}</h2>
                <p>{category.value}</p>
                {assignedCoachees.getCoachDashboardData[category.key].length >
                0 ? (
                  assignedCoachees.getCoachDashboardData[category.key].map(
                    (coachee: CoacheeDataType) => (
                      <CoacheeProfileCard
                        key={coachee.id}
                        coachee={coachee}
                        content={content.coacheeCard.data.attributes}
                      />
                    )
                  )
                ) : (
                  <p>No se han encontrado coachees para esta categoria</p>
                )}
              </Row>
            ))}
          </ContainerMotion>
        </Tab>
      </Tabs>
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }
  if (session.user.role !== userRoles.COACH)
    return {
      redirect: { destination: '/dashboard/coachee', permanent: false },
      props: {},
    }

  const apollo = createApolloClient(session.token)
  const { data: assignedCoachees } = await apollo.query({
    query: GET_ASSIGNED_COACHEES,
    context: { ms: microServices.backend },
  })

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      assignedCoachees: assignedCoachees,
      content: data.coachDashboard.data.attributes,
    },
  }
}

export default CoachDashboard
