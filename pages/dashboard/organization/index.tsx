// main tools
import { getSession } from 'next-auth/react'

// components
import { Layout } from 'components/organisms/Layout'
import { CoacheesDatatable } from 'components/organisms/DashboardOrg/CoacheesDatatable'
import { Strengths } from 'components/organisms/DashboardOrg/Strengths'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import ORG_DASHBOARD from 'lib/strapi/queries/Organization/OrgDashboard.gql'

// styles
import classes from 'styles/DashboardOrg/page.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'
import { Satisfaction } from 'components/organisms/DashboardOrg/Satisfaction'

const OrgDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  session,
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
              <CoacheesDatatable session={session} content={content} />
            </Container>
          </Col>
          <Col sm={12} lg={6} className='mb-5'>
            <Container>
              <h3 className={`mb-5 ${classes.title}`}>
                {content.coachingSessionsTitle}
              </h3>
              <Strengths content={content.graphDevelopmentArea} />
            </Container>
          </Col>
          <Col sm={12} lg={6} className='mb-5'>
            <Container>
              <Satisfaction />
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
  else if (!session.user.organization)
    return {
      redirect: { destination: '/signup/organization', permanent: false },
    }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: ORG_DASHBOARD,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const content = data.orgDashboard.data.attributes

  return {
    props: {
      session,
      content: {
        ...content,
        datatable: content.datatable.data.attributes,
        graphDevelopmentArea: content.graphDevelopmentArea.data.attributes,
      },
    },
  }
}

export default OrgDashboard
