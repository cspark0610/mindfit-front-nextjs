import { CoachSessionCard } from 'components/molecules/CoachSessionCard'
import { Layout } from 'components/organisms/Layout'
import dynamic from 'next/dynamic'
import { Col, Container, Row } from 'react-bootstrap'

function Session() {
  const AgoraVideoCall = dynamic<any>(
    () =>
      import('../../src/components/molecules/AgoraVideoCall').then(
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
            <CoachSessionCard
              data={{
                id: '234d',
                name: 'Katherine Smith',
                title: 'Especialista en Motivación',
                description: 'Te ayudo a sacar la mejor version de ti mismo',
                picture: '/assets/images/avatar.png',
                areas: [
                  'Desarrollo de liderazgo',
                  'Psicologia positiva',
                  'Crecimiento personal',
                ],
              }}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Session
