// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { CoachProfile } from 'components/organisms/Profile/coachProfile'
import { CoacheeProfile } from 'components/organisms/Profile/coacheeProfile'

// commons
import { microServices } from 'commons'

// gql
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'
import PROFILE_CONTENT from 'lib/strapi/queries/UserProfile/content.gql'
import CHANGE_PASSWORD_CONTENT from 'lib/strapi/queries/ChangePassword/page.gql'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetSSPropsType } from 'types'
import { CoacheeDataType } from 'types/models/Coachee'
import { GetServerSidePropsContext, NextPage } from 'next'

const UserProfile: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachee,
  coach,
  content,
}) => (
  <Layout>
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        {coachee && <CoacheeProfile coachee={coachee} content={content} />}
        {coach && <CoachProfile />}
      </Container>
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)

  const apollo = createApolloClient(session?.token)
  const { data } = await apollo.query({
    query: GET_COACHEE_BY_ID,
    context: { ms: microServices.backend },
    variables: { id: session?.user.coachee?.id },
  })

  const apolloClient = initializeApolloClient()
  const { data: content } = await apolloClient.query({
    query: PROFILE_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const { data: contentPass } = await apolloClient.query({
    query: CHANGE_PASSWORD_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      coachee: {
        ...(data.findCoacheeById as CoacheeDataType),
        user: session?.user,
      },
      coach: null,
      content: {
        userProfile: content.userProfile.data.attributes,
        changePassword: contentPass.changePassword.data.attributes,
      },
    },
  }
}

export default UserProfile
