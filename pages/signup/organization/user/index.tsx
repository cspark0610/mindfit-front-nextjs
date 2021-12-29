// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSideProps, NextPage } from 'next'
import { UserSignup } from 'components/organisms/OrganizationSignup/User'

const SignupOrgUserPage: NextPage = () => (
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
      redirect: {
        destination: '/signup/organization/company',
        permanent: false,
      },
    }

  return { props: {} }
}

export default SignupOrgUserPage
