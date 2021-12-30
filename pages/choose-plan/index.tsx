// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// components
import { ActualPlan } from 'components/atoms/ActualPlan'
import { PlanCard } from 'components/atoms/PlanCard'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { NextPage, GetServerSidePropsContext } from 'next'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

const ChoosePlanPage: NextPage = () => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <ActualPlan />
      <Row className='mt-5'>
        <Col md={3}>
          <PlanCard />
        </Col>
        <Col md={3}>
          <PlanCard selected />
        </Col>
        <Col md={3}>
          <PlanCard />
        </Col>
        <Col md={3}>
          <PlanCard />
        </Col>
      </Row>
      <ExploreBadge />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return {
      redirect: { destination: '/signup/organization/user', permanent: false },
    }
  if (session.user.name === '0')
    return {
      redirect: { destination: '/signup/organization', permanent: false },
    }

  return { props: {} }
}

export default ChoosePlanPage
