// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { ColaboratorSignup } from 'components/organisms/ColaboratorSignup'

// styles
import classes from 'styles/signup/colaborator.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'
import { Session } from 'next-auth'

const SignupColaboratorUserPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ session }) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <ColaboratorSignup session={session as Session} />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/signup', permanent: false }, props: {} }
  if (session?.user.coachee)
    return {
      redirect: { destination: '/signup/colaborator/steps', permanent: false },
      props: {},
    }

  return { props: { session } }
}

export default SignupColaboratorUserPage
