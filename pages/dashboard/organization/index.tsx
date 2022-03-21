// main tools
import { getSession } from 'next-auth/react'

// components
import { Layout } from 'components/organisms/Layout'
import { CoacheesDatatable } from 'components/organisms/DashboardOrg/CoacheesDatatable'
import { Strengths } from 'components/organisms/DashboardOrg/Strengths'
import { Satisfaction } from 'components/organisms/DashboardOrg/Satisfaction'
import { FocusAreas } from 'components/organisms/DashboardOrg/FocusAreas'
import { Timeline } from 'components/organisms/DashboardOrg/Timeline'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

//gql
import GET_COACHEE_PROFILE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import ORG_DASHBOARD from 'lib/strapi/queries/Organization/orgDashboard.gql'
import { createApolloClient } from 'lib/apolloClient'
import { initializeApolloClient } from 'lib/apollo'

// styles
import classes from 'styles/DashboardOrg/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const OrgDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  user,
  content,
}) => {
  return (
    <Layout>
      <Container className='my-4' fluid>
        <Row className='mb-5 justify-content-center'>
          <Col xs={12} className='mb-5'>
            <Container>
              <h3 className={`mb-5 ${classes.title}`}>
                {content.coacheesTitle}
              </h3>
              <CoacheesDatatable user={user} content={content} />
            </Container>
          </Col>
          <Col sm={12} lg={6} className='mb-5'>
            <Container>
              <h3 className={`mb-5 ${classes.title}`}>
                {content.coachingSessionsTitle}
              </h3>
              <Timeline content={content.graphTimeLine} />
              <Strengths content={content.graphDevelopmentArea} />
            </Container>
          </Col>
          <Col sm={12} lg={6} className='mb-5'>
            <Container>
              <Satisfaction />
              <FocusAreas content={content.graphFocusArea} />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/', permanent: false } }

  const apolloClient = createApolloClient(session.token)
  const apolloClientForStrapi = initializeApolloClient()

  const { data: user } = await apolloClient.query({
    query: GET_COACHEE_PROFILE,
    context: { ms: microServices.backend },
  })

  if (
    !user.getCoacheeProfile.isAdmin &&
    !user.getCoacheeProfile.canViewDashboard
  )
    return { redirect: { destination: '/dashboard/coachee', permanent: false } }

  const { data } = await apolloClientForStrapi.query({
    query: ORG_DASHBOARD,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const content = data.orgDashboard.data.attributes

  return {
    props: {
      user: user.getCoacheeProfile,
      content: {
        ...content,
        datatable: content.datatable.data.attributes,
        coacheeForm: content.coacheeForm.data.attributes,
        confirmDeletion: content.confirmDeletion.data.attributes,
        graphDevelopmentArea: content.graphDevelopmentArea.data.attributes,
        graphFocusArea: content.graphFocusArea.data.attributes,
        graphTimeLine: content.graphTimeLine.data.attributes,
      },
    },
  }
}

export default OrgDashboard
