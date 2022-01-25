// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { UserSignup } from 'components/organisms/Signup'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSideProps, NextPage } from 'next'

const Signup: NextPage = () => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <UserSignup />
    </Container>
  </Container>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (session)
    return {
      redirect: { destination: '/signup/organization', permanent: false },
    }

  return { props: {} }
}

export default Signup
