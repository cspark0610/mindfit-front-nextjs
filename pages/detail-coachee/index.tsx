// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { Notes } from 'components/molecules/Notes'
import { CardHistory } from 'components/molecules/CardHistory'
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { Evaluation } from 'components/molecules/Evaluation'

// styles
import classes from 'styles/DetailCoachee/detailCoachee.module.scss'

// types
import { NextPage } from 'next'

const DetailCoachee: NextPage = () => (
  <Layout>
    <Container>
      <Row>
        <Col md={6} lg={3} className='pt-4'>
          <Container className={`p-4 ${classes.section}`}>
            <CoacheeProfileCard showButton={true} />
          </Container>
        </Col>
        <Col md={6} className='pt-4'>
          <Container className={`p-5 ${classes.section}`}>
            <Evaluation/>
          </Container>
        </Col>
        <Col md={12} lg={3} className='pt-4'>
          <Container className={`p-4 ${classes.section}`}>
            <Notes/>
          </Container>
        </Col>
      </Row>
      <Row className='pt-4 pb-4'>
        <h3 className={classes.title}>Historial</h3>
        {[0, 1, 2, 3].map((item) => (
          <Col xs={6} lg={3} key={item} className='mt-4'>
            <CardHistory />
          </Col>
        ))}
      </Row>
    </Container>
  </Layout>
)

export default DetailCoachee
