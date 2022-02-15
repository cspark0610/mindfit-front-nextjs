// main tools
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// components
import { CompletedStep, ActualStep, NextStep } from 'components/atoms/StepsCard'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// gql
import { initializeApolloClient } from 'lib/apollo'
import GET_STEPS_CONTENT from 'lib/strapi/queries/Colaborator/stepsContent.gql'

// utils
import { microServices } from 'commons'

// styles
import classes from 'styles/signup/colaborator.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const ColaboratorStepsPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ steps, content }) => {
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
          <span>{content.label}</span>
          <Link href='/signup/organization'>
            <a>{content.value}</a>
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

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: GET_STEPS_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const content = data.collaboratorStep.data.attributes

  const steps = [
    {
      label: content.steps[0].label,
      action: content.steps[0].value,
      completed: !session?.user.coachee ? false : true,
      url: '/signup/coachee/user',
    },
    {
      label: content.steps[1].label,
      action: content.steps[1].value,
      completed: !session?.user.coach ? false : true,
      url: '/quiz',
    },
    {
      label: content.steps[2].label,
      action: content.steps[2].value,
      completed: !session || session.user.name === '2' ? false : true,
      url: '/coaches',
    },
  ]

  return { props: { content: content.becomeOrgLabel, steps } }
}

export default ColaboratorStepsPage
