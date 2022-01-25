// main tools
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// components
import { ActualPlan } from 'components/atoms/ActualPlan'
import { PlanCard } from 'components/atoms/PlanCard'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import CHOOSEPLAN_VIEW from 'lib/queries/ChoosePlan/ChoosePlan.gql'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { NextPage, GetServerSidePropsContext } from 'next'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { GetSSPropsType } from 'types'

const ChoosePlanPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  contentChoose, contentPayment
}) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <ActualPlan content={contentChoose.view} />
      <Row className='mt-5'>
        {contentChoose.card.map((plan:any, idx:number) => (
          <Col className='my-3' key={idx} xs={12} md={6} xl={3}>
            <PlanCard
              selected={plan === 1 ? true : false}
              contentCard={plan.attributes}
              contentMethod={contentPayment}
            />
          </Col>
        ))}
      </Row>
      <Row className='mt-5 flex-row-reverse'>
        <Col xs={12} sm={5} lg={2}>
          <Link passHref href='/signup/organization'>
            <Button className={classes.button}>
              {contentChoose.view.next.label}
            </Button>
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

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: CHOOSEPLAN_VIEW,
    context: { ms: microServices.strapi },
  })
  const view = data.choosePlan.data.attributes
  const card = data.choosePlan.data.attributes.card_plans.data
  const method = data.paymentMethod.data.attributes
  const credit = data.paymentMethod.data.attributes.creditCard.data.attributes
  return {
    props: {
      contentChoose: {
        view,
        card
      },
      contentPayment: {
        method,
        credit
      },
    },
  }
}

export default ChoosePlanPage
