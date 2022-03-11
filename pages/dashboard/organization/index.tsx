// main tools
import { getSession } from 'next-auth/react'

// components
import { Layout } from 'components/organisms/Layout'
import { CoacheesDatatable } from 'components/organisms/DashboardOrg/CoacheesDatatable'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import ORG_DASHBOARD from 'lib/strapi/queries/Organization/orgDashboard.gql'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const OrgDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  session,
  content,
}) => {
  return (
    <Layout>
      <Container className='my-4' fluid>
        <Row className='mb-5 justify-content-center'>
          <Col xs={12}>
            <CoacheesDatatable session={session} content={content} />
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

  const { data: content } = await apolloClient.query({
    query: ORG_DASHBOARD,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      session,
      content: content.orgDashboard.data.attributes,
    },
  }
}

export default OrgDashboard
