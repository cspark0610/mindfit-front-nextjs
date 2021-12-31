// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { ColaboratorSignup } from 'components/organisms/ColaboratorSignup'

// styles
import classes from 'styles/signup/colaborator.module.scss'

// types
import { GetServerSideProps, NextPage } from 'next'

const SignupColaboratorUserPage: NextPage = () => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <ColaboratorSignup />
    </Container>
  </Container>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session)
    return {
      redirect: { destination: '/signup/colaborator', permanent: false },
    }

  return { props: {} }
}

export default SignupColaboratorUserPage
