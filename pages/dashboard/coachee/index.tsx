// Main tools
import { getSession } from 'next-auth/react'

// gql
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import GET_COACHEE from 'lib/queries/Coachee/getById.gql'
import GET_PAGE_CONTENT from 'lib/strapi/queries/Coachee/dashboardContent.gql'

// Components
import { Layout } from 'components/organisms/Layout'
import { CoachObjectives } from 'components/molecules/CoachObjectives'
import { CoachProfileCard } from 'components/molecules/CoachProfileCard'
import { RecommendedContentList } from 'components/molecules/RecommendedContentList'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// utils
import { microServices } from 'commons'

// Types
import { GetSSPropsType } from 'types'
import { NextPage, GetServerSidePropsContext } from 'next'

const UserDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  coachee,
}) => (
  <Layout>
    <Container className='my-4' fluid>
      <Row className='mb-5 justify-content-center'>
        <Col xs={12} lg={6} xl={3}>
          <CoachProfileCard coachId={coachee.assignedCoach?.id} />
        </Col>
        <Col xs={12} lg={6} xl={7}>
          <CoachObjectives content={content} />
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

  const apolloClient = initializeApolloClient()
  const { data: content } = await apolloClient.query({
    query: GET_PAGE_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const apollo = createApolloClient(session.token)

  const { data } = await apollo.query({
    query: GET_COACHEE,
    variables: { id: session.user.coachee?.id },
    context: { ms: microServices.backend },
  })

  return {
    props: {
      content: content.coacheeDashboard.data.attributes,
      coachee: data.findCoacheeById,
    },
  }
}

export default UserDashboard