// Main tools
import { getSession } from 'next-auth/react'

// gql
import GET_PAGE_CONTENT from 'lib/strapi/queries/Coachee/dashboardContent.gql'
import { initializeApolloClient } from 'lib/apollo'

// Components
import { RecommendedContentList } from 'components/molecules/RecommendedContentList'
import { CoacheeObjectives } from 'components/molecules/CoacheeObjectives'
import { CoachProfileCard } from 'components/molecules/CoachProfileCard'
import { Layout } from 'components/organisms/Layout'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// utils
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { GetSSPropsType } from 'types'

const UserDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => (
  <Layout>
    <Container className='my-4' fluid>
      <Row className='mb-5 justify-content-center'>
        <Col xs={12} lg={6} xl={3}>
          <CoachProfileCard />
        </Col>
        <Col xs={12} lg={6} xl={7}>
          <CoacheeObjectives content={content} />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} md={10}>
          <RecommendedContentList content={content} />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }
  if (!session.user.role?.includes(userRoles.COACHEE))
    return {
      redirect: { destination: '/dashboard/coach', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data: content } = await apolloClient.query({
    query: GET_PAGE_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: content.coacheeDashboard.data.attributes } }
}

export default UserDashboard
