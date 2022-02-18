// Main tools
import { getSession } from 'next-auth/react'

// gql
import { createApolloClient } from 'lib/apolloClient'
import GET_COACHEE_AGENDA from 'lib/queries/Coachee/getById.gql'

// Components
import { CoachProfileCard } from 'components/molecules/CoachProfileCard'
import { CoachObjectives } from 'components/molecules/CoachObjectives'
import { RecommendedContentList } from 'components/molecules/RecommendedContentList'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// utils
import { microServices } from 'commons'

// Types
import { NextPage, GetServerSideProps } from 'next'
import { Layout } from 'components/organisms/Layout'
import { GetSSPropsType } from 'types'

const UserDashboard: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachee,
}) => (
  <Layout>
    <Container className='my-4' fluid>
      <Row className='mb-5 justify-content-center'>
        <Col xs={12} lg={6} xl={3}>
          <CoachProfileCard coachId={coachee.assignedCoach?.id} />
        </Col>
        <Col xs={12} lg={6} xl={7}>
          <CoachObjectives />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col xs={12} md={10}>
          <RecommendedContentList />
        </Col>
      </Row>
    </Container>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/', permanent: false } }

  const apolloClient = createApolloClient(session.token)

  const { data } = await apolloClient.query({
    query: GET_COACHEE_AGENDA,
    variables: { id: session.user.coachee?.id },
    context: { ms: microServices.backend },
  })

  return { props: { coachee: data.findCoacheeById } }
}

export default UserDashboard
