// main tools
import Link from 'next/link'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// components
import { CompletedStep, ActualStep, NextStep } from 'components/atoms/StepsCard'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { NextPage } from 'next'

const steps = [
  {
    label: 'Registra a tu empresa',
    action: '¡Empecemos!',
    url: 'user',
    completed: false,
  },
  {
    label: 'Invita a tus colaboradores',
    action: 'Invita a tus colaboradores',
    url: 'colaborators',
    completed: false,
  },
  {
    label: 'Elige un plan',
    action: 'Elige un plan',
    url: 'plan',
    completed: false,
  },
]

const SignupOrgPage: NextPage = () => {
  const stepIndex = steps.findIndex((step) => step.completed === false)

  return (
    <Container className={classes.container}>
      <Container fluid className={classes.card}>
        {steps.map((step, idx) => {
          if (idx < stepIndex)
            return <CompletedStep key={idx} label={step.label} />
          else if (idx === stepIndex)
            return <ActualStep key={idx} index={idx + 1} label={step.label} />
          else return <NextStep key={idx} label={step.label} />
        })}
        <Row>
          <Col xs={12}>
            <Link passHref href={`organization/${steps[stepIndex].url}`}>
              <Button className={classes.button}>
                {steps[stepIndex].action}
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          <ExploreBadge />
        </Row>
      </Container>
    </Container>
  )
}

export default SignupOrgPage
