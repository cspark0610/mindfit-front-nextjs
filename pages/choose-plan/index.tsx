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
import CHOOSEPLAN_VIEW from 'lib/queries/ChoosePlan/choosePlan.gql'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { NextPage, GetServerSidePropsContext } from 'next'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { GetSSPropsType } from 'types'

const ChoosePlanPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <ActualPlan content={content?.choosePlan.currentPlan} />
      <Row className='mt-5'>
        {content?.choosePlan.card_plans.data.map(
          ({ attributes }: any, idx: number) => (
            <Col className='my-3' key={idx} xs={12} md={6} xl={3}>
              <PlanCard
                selected={false}
                content={{ ...attributes, payment: content.payment }}
              />
            </Col>
          )
        )}
      </Row>
      <Row className='mt-5 flex-row-reverse'>
        <Col xs={12} sm={5} lg={2}>
          <Link passHref href='/signup/organization'>
            <Button className={classes.button}>
              {content?.choosePlan.next.label}
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
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }
  if (session.user.name === '0')
    return {
      redirect: { destination: '/signup/organization', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: CHOOSEPLAN_VIEW,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      content: {
        choosePlan: data.choosePlan.data.attributes,
        payment: data.payment.data.attributes,
      },
    },
  }
}

export default ChoosePlanPage
