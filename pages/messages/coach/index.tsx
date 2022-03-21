// components
import { Layout } from 'components/organisms/Layout'
import { DashboardChat } from 'components/organisms/DashboardChat'
import { RecentCoacheesCard } from 'components/atoms/RecentCoachees'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

//styles
import classes from 'styles/Messages/menuPage.module.scss'

// types
import { NextPage } from 'next'

const MessagesCoach: NextPage = () => {
  return (
    <Layout>
      <Container>
        <Row>
          <Col sm={12} lg={6} className='my-4'>
            <DashboardChat />
          </Col>
          <Col sm={12} lg={6} xl={4} className='my-4'>
            <h4 className={`mb-4 ${classes.title}`}>
              Coachees Asignados recientemente
            </h4>
            {[1, 2, 3].map((item) => (
              <RecentCoacheesCard key={item} />
            ))}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default MessagesCoach
