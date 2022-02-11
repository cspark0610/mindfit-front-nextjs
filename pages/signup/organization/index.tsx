// main tools
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// components
import { CompletedStep, ActualStep, NextStep } from 'components/atoms/StepsCard'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// Commons
import { microServices } from 'commons'

// gql
import { initializeApolloClient } from 'lib/apollo'
import STEPS_CONTENT from 'lib/queries/Organization/organizationSteps.gql'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const SignupOrgPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  steps,
  content,
}) => {
  if (!steps) return null

  const stepIndex = steps.findIndex((step) => step.completed === false)

  return (
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        {steps.map((step, idx) => {
          if (idx < stepIndex)
            return <CompletedStep key={idx} label={step.label} />
          else if (idx === stepIndex)
            return <ActualStep key={idx} index={idx + 1} label={step.label} />
          else return <NextStep key={idx} label={step.label} />
        })}
        <Row>
          <Col xs={12}>
            <Link passHref href={steps[stepIndex]?.url || '#'}>
              <Button className={classes.button}>
                {steps[stepIndex]?.action}
              </Button>
            </Link>
          </Col>
        </Row>
        <Row className='mt-3 text-center'>
          <span>{content?.becomeCoacheeLabel.label}</span>
          <Link href='/signup/coachee/steps'>
            <a>{content?.becomeCoacheeLabel.value}</a>
          </Link>
        </Row>
        <Row>
          <ExploreBadge />
        </Row>
      </Container>
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/signup', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: STEPS_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const content = data.organizationSteps.data.attributes
  const steps = [
    {
      label: content.steps[0].label,
      action: content.steps[0].value,
      completed: !session?.user.organization ? false : true,
      url: '/create-organization',
    },
    {
      label: content.steps[1].label,
      action: content.steps[1].value,
      completed: !session || session.user.name === '1' ? false : true,
      url: '/choose-plan',
    },
    {
      label: content.steps[2].label,
      action: content.steps[2].value,
      completed: !session || session.user.organization ? false : true,
      url: '/coachees/add',
    },
  ]

  return { props: { steps, content } }
}

export default SignupOrgPage
