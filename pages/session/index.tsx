// main tools
import dynamic from 'next/dynamic'

// components
import { CoachProfileCard } from 'components/molecules/CoachProfileCard'
import { Layout } from 'components/organisms/Layout'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// tyles
import { NextPage } from 'next'

const Session: NextPage = () => {
  const AgoraVideoCall = dynamic<any>(
    () =>
      import('components/molecules/AgoraVideoCall').then(
        (comp) => comp.AgoraVideoCall
      ),
    { ssr: false }
  )

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={7} lg={8}>
            <AgoraVideoCall />
          </Col>
          <Col md={5} lg={4}>
            <CoachProfileCard coachId={3} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Session
