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
import { createApolloClient } from 'lib/apolloClient'
import GET_STEPS_CONTENT from 'lib/strapi/queries/Colaborator/stepsContent.gql'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'

// utils
import { microServices } from 'commons'
import { coacheeRegistrationStatus } from 'utils/enums'

// styles
import classes from 'styles/signup/colaborator.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'
import { CoacheeDataType } from 'types/models/Coachee'

const ColaboratorStepsPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ steps, content }) => {
  if (!steps) return null

  const stepIndex = steps?.findIndex((step) => step.completed === false)

  return (
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        {steps?.map((step, idx) => {
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
        {/* <Row className='mt-3 text-center'>
          <span>{content.label}</span>
          <Link href='/signup/organization'>
            <a>{content.value}</a>
          </Link>
        </Row> */}
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
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: GET_STEPS_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })
  const content = data.collaboratorStep.data.attributes

  const apollo = createApolloClient(session?.token)

  const { data: coachee } = await apollo.query<{
    findCoacheeById: CoacheeDataType
  }>({
    query: GET_COACHEE_BY_ID,
    variables: { id: session?.user.coachee?.id },
    context: { ms: microServices.backend },
  })

  const status = [
    coacheeRegistrationStatus.REGISTRATION_COMPLETED,
    coacheeRegistrationStatus.COACH_APPOINTMENT_PENDING,
  ]

  if (status.includes(coachee.findCoacheeById.registrationStatus as string))
    return { redirect: { destination: '/user', permanent: false }, props: {} }

  const steps = [
    {
      label: content.steps[0].label,
      action: content.steps[0].value,
      completed: !coachee ? false : true,
      url: '/signup/coachee/user',
    },
    {
      label: content.steps[1].label,
      action: content.steps[1].value,
      completed:
        coachee.findCoacheeById.registrationStatus ===
        coacheeRegistrationStatus.SAT_PENDING
          ? false
          : true,
      url: '/quiz',
    },
    {
      label: content.steps[2].label,
      action: content.steps[2].value,
      completed:
        coachee.findCoacheeById.registrationStatus ===
        coacheeRegistrationStatus.COACH_SELECTION_PENDING
          ? false
          : true,
      url: '/choose-coach',
    },
  ]

  return { props: { content: content.becomeOrgLabel, steps } }
}

export default ColaboratorStepsPage
