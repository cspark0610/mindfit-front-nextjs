// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { Notes } from 'components/molecules/Notes'
import { AgoraVideoCall } from 'components/molecules/AgoraVideoCall'
import { Evaluation } from 'components/molecules/Evaluation'

// styles
import classes from 'styles/UI/Card/AppCard.module.scss'

// types
import { NextPage } from 'next'

const CoachSession: NextPage = () => (
  <Layout>
    <Container>
      <Row className='mt-4'>
        <Col md={6} lg={3} className='mt-4' >
          <Container className={`p-4 ${classes.section}`}>
            <CoacheeProfileCard showButton={true} />
          </Container>
        </Col>
        <Col md={6} className='mt-4'>{/*<AgoraVideoCall/>*/}</Col>
        <Col md={12} lg={3} className='mt-4'>
          <Container className={`p-4 ${classes.section}`}>
            <Notes />
          </Container>
        </Col>
      </Row>
      <Row className='mt-4 mb-4'>
        <Col>
          <Container className={`p-5 ${classes.section}`}>
            <Evaluation />
          </Container>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default CoachSession
