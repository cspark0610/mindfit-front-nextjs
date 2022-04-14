// main tools
import { Session } from 'next-auth'
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { ColaboratorSignup } from 'components/organisms/ColaboratorSignup'

// commons
import { microServices } from 'commons'

// gql
import { initializeApolloClient } from 'lib/apollo'
import GET_CONTENT from 'lib/strapi/queries/Coachee/signupContent.gql'

// styles
import classes from 'styles/signup/userColaborator.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const SignupColaboratorUserPage: NextPage<
  GetSSPropsType<typeof getServerSideProps>
> = ({ session, content }) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <ColaboratorSignup session={session as Session} content={content} />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/signup', permanent: false }, props: {} }
  if (!session?.user.coachee)
    return {
      redirect: { destination: '/signup', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data: content } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      session,
      content: content.coacheeSignup.data.attributes,
    },
  }
}

export default SignupColaboratorUserPage
