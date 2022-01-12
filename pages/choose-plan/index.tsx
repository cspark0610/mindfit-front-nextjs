// main tools
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

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
        {[0, 1, 2, 3].map((plan) => (
          <Col className='my-3' key={plan} xs={12} md={6} xl={3}>
            <PlanCard selected={plan === 1 ? true : false} />
          </Col>
        ))}
      </Row>
      <Row className='mt-5 flex-row-reverse'>
        <Col xs={12} sm={5} lg={2}>
          <Link passHref href='/signup/organization'>
            <Button className={classes.button}>Siguiente</Button>
          </Link>
        </Col>
      </Row>
      <ExploreBadge />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session) return { redirect: { destination: '/login', permanent: false } }
  if (session.user.name === '0')
    return {
      redirect: { destination: '/signup/organization', permanent: false },
    }

  return { props: {} }
}

export default ChoosePlanPage
