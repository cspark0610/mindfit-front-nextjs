// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { UserSignup } from 'components/organisms/Signup'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import SIGNUP_CONTENT from 'lib/queries/User/userRegister.gql'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { NextPage, GetServerSidePropsContext } from 'next'
import { GetSSPropsType } from 'types'

const Signup: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <UserSignup content={content} />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (session)
    return {
      redirect: { destination: '/signup/organization', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: SIGNUP_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.userRegister.data.attributes } }
}

export default Signup
