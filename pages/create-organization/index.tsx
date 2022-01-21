// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSideProps, NextPage } from 'next'
import { CompanySignup } from 'components/organisms/OrganizationSignup/Company'

const CreateOrgPage: NextPage = () => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <CompanySignup />
    </Container>
  </Container>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/signup', permanent: false } }
  if (session.user.name === '1')
    return {
      redirect: { destination: '/signup/organization', permanent: false },
    }

  return { props: {} }
}

export default CreateOrgPage
