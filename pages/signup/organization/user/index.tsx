// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { UserSignup } from 'components/organisms/OrganizationSignup/User'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import USERREGISTER_VIEW from 'lib/queries/User/userRegister.gql'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSideProps, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const SignupOrgUserPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ content }) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <UserSignup content={content.view} contentForm={content.form} />
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

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: USERREGISTER_VIEW,
    context: { ms: microServices.strapi },
  })
  const view = data.userRegister.data.attributes
  const form = data.userRegister.data.attributes.form.data.attributes
  return {
    props: {
      content: {
        view,
        form,
      },
    },
  }
}

export default SignupOrgUserPage
