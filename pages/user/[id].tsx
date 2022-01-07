// Main tools
import { getSession } from 'next-auth/react'

// Components
import { CoachProfileCard } from 'components/molecules/CoachProfileCard'
import { CoachObjectives } from 'components/molecules/CoachObjectives'
import { RecommendedContentList } from 'components/molecules/RecommendedContentList'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// Types
import { NextPage, GetServerSideProps } from 'next'
import { Layout } from 'components/organisms/Layout'

const UserDashboard: NextPage = () => {
  return (
    <Layout>
      <Container className='m-4' fluid>
        <Row className='mb-5 justify-content-center'>
          <Col xs={12} md={3}>
            <CoachProfileCard />
          </Col>
          <Col xs={12} md={5}>
            <CoachObjectives />
          </Col>
        </Row>
        <Row>
          <RecommendedContentList />
        </Row>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session)
    return {
      redirect: { destination: '/login', permanent: false },
    }

  return { props: {} }
}

export default UserDashboard
