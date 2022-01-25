// main tools
import { getSession } from 'next-auth/react'
import Link from 'next/link'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// components
import { CompletedStep, ActualStep, NextStep } from 'components/atoms/StepsCard'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const SignupOrgPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  steps,
}) => {
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
          <span>No quieres crear una organizacion?</span>
          <Link href='/signup/colaborator/steps'>
            <a>Continua como Coachee</a>
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
  const content = await import('@public/jsons/signup/organization.json')

  const steps = [
    {
      label: content.steps[0].label,
      action: content.steps[0].action,
      completed: !session?.user.organization ? false : true,
      url: '/create-organization',
    },
    {
      label: content.steps[1].label,
      action: content.steps[1].action,
      completed: !session || session.user.name === '1' ? false : true,
      url: '/choose-plan',
    },
    {
      label: content.steps[2].label,
      action: content.steps[2].action,
      completed: !session || session.user.organization ? false : true,
      url: '/colaborators/add',
    },
  ]

  return { props: { content: content.default, steps } }
}

export default SignupOrgPage
