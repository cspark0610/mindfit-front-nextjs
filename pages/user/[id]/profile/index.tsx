// main tools
import { getSession } from 'next-auth/react'

// components
import { Layout } from 'components/organisms/Layout'
import { CoachProfile } from 'components/organisms/Profile/coachProfile'
import { CoacheeProfile } from 'components/organisms/Profile/coacheeProfile'

// commons
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// gql
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import GET_COACH from 'lib/queries/Coach/getProfile.gql'
import PROFILE_CONTENT from 'lib/strapi/queries/UserProfile/content.gql'
import GET_COACHEE_PROFILE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import COACH_PROFILE_CONTENT from 'lib/strapi/queries/CoachProfile/content.gql'
import CHANGE_PASSWORD_CONTENT from 'lib/strapi/queries/ChangePassword/page.gql'

// types
import { GetSSPropsType } from 'types'
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'
import { GetServerSidePropsContext, NextPage } from 'next'

const UserProfile: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coach,
  coachee,
  content,
}) => (
  <Layout>
    {coachee && <CoacheeProfile coachee={coachee} content={content} />}
    {coach && <CoachProfile coach={coach} content={content} />}
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()
  const apollo = createApolloClient(session?.token)
  const userData: { coachee?: CoacheeDataType; coach?: CoachDataType } = {}
  const content: any = {}

  if (session?.user.role?.includes(userRoles.COACHEE)) {
    await apollo
      .query({
        query: GET_COACHEE_PROFILE,
        context: { ms: microServices.backend },
      })
      .then(({ data }) => {
        userData.coachee = data.getCoacheeProfile as CoacheeDataType
      })

    const { data: contentResponse } = await apolloClient.query({
      query: PROFILE_CONTENT,
      variables: { locale: ctx.locale },
      context: { ms: microServices.strapi },
    })
    content.userProfile = contentResponse.userProfile.data.attributes
  } else if (session?.user.role === userRoles.COACH) {
    await apollo
      .query({
        query: GET_COACH,
        context: { ms: microServices.backend },
      })
      .then(
        ({ data }) => (userData.coach = data.getCoachProfile as CoachDataType)
      )

    const { data: contentResponse } = await apolloClient.query({
      query: COACH_PROFILE_CONTENT,
      variables: { locale: ctx.locale },
      context: { ms: microServices.strapi },
    })
    content.userProfile = contentResponse.coachProfile.data.attributes
  }

  const { data: contentPass } = await apolloClient.query({
    query: CHANGE_PASSWORD_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })
  content.changePassword = contentPass.changePassword.data.attributes

  return {
    props: {
      coachee: userData.coachee
        ? { ...userData.coachee, user: session?.user }
        : null,
      coach: userData.coach ? { ...userData.coach, user: session?.user } : null,
      content,
    },
  }
}

export default UserProfile
