// main tools
import { getSession, useSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { CoachProfile } from 'components/organisms/Profile/coachProfile'
import { CoacheeProfile } from 'components/organisms/Profile/coacheeProfile'

// commons
import { microServices } from 'commons'

// gql
import { createApolloClient } from 'lib/apolloClient'
import { initializeApolloClient } from 'lib/apollo'
import COACHEE_PROFILE from 'lib/queries/User/findUserById.gql'
import PROFILE_CONTENT from 'lib/strapi/queries/UserProfile/content.gql'
import CHANGE_PASSWORD_CONTENT from 'lib/strapi/queries/ChangePassword/page.gql'
import COACH_PROFILE from 'lib/queries/Profile/findCoachById.gql'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const UserProfile: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  data,
  content,
}) => (
  <Layout>
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        {data.coachee && (
          <CoacheeProfile data={data.coachee} content={content} />
        )}
        {data.coach && <CoachProfile data={data.coach} />}
      </Container>
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  const apolloClient = initializeApolloClient()
  const createApollo = createApolloClient(session?.token)

  const { data: content } = await apolloClient.query({
    query: PROFILE_CONTENT,
    context: { ms: microServices.strapi },
  })
  const { data: contentPass } = await apolloClient.query({
    query: CHANGE_PASSWORD_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  let coachee = null
  let coach = null

  try {
    coachee = await apolloClient.query({
      query: COACHEE_PROFILE,
      variables: { id: session?.user.coachee?.id },
      context: { ms: microServices.backend },
    })
  } catch (error) {
    coach = await createApollo.query({
      query: COACH_PROFILE,
      variables: { id: session?.user.coach?.id },
      context: { ms: microServices.backend },
    })
  }
  return {
    props: {
      data: {
        coachee: coachee?.data.findCoacheeById || null,
        coach: coach?.data.findCoachById || null,
      },
      content: {
        ...content.userProfile.data.attributes,
        ...contentPass.changePassword.data.attributes,
      },
    },
  }
}

export default UserProfile
