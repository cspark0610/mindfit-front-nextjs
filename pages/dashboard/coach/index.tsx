// main tools
import { getSession } from 'next-auth/react'

// components
import { Layout } from 'components/organisms/Layout'
import { AllCoachees } from 'components/organisms/DashboardCoach/AllCoachees'

// motion
import { ContainerMotion } from 'components/atoms/AnimateComponents'
import { viewportFadeIn } from 'commons/animations'

// gql
import { initializeApolloClient } from 'lib/apollo'
import GET_CONTENT from 'lib/strapi/queries/Coach/dashboardContent.gql'

// utils
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// bootstrap components
import { Tabs, Tab, Container, Row } from 'react-bootstrap'

// styles
import classes from 'styles/coachDashboard/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const CoachDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  return (
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
                <AllCoachees content={content.coacheeCard.data.attributes} />
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
                  <AllCoachees content={content.coacheeCard.data.attributes} />
                </Row>
              ))}
            </ContainerMotion>
          </Tab>
        </Tabs>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }
  if (session.user.role !== userRoles.COACH)
    return { redirect: { destination: '/user', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.coachDashboard.data.attributes } }
}

export default CoachDashboard
