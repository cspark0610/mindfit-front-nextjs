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
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'
import GET_ORGANIZATION_BY_ID from 'lib/queries/Organization/getById.gql'
import GET_COACH_BY_ID from 'lib/queries/Coach/getById.gql'
import PROFILE_CONTENT from 'lib/strapi/queries/UserProfile/content.gql'
import CHANGE_PASSWORD_CONTENT from 'lib/strapi/queries/ChangePassword/page.gql'

// types
import { GetSSPropsType } from 'types'
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'
import { GetServerSidePropsContext, NextPage } from 'next'
import { OrganizationDataType } from 'types/models/Organization'
import { OrganizationProfile } from 'components/organisms/Profile/organizationProfile'

const UserProfile: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coach,
  coachee,
  content,
  organization,
  showOrganization,
}) => (
  <Layout>
    {coachee && showOrganization === undefined && (
      <CoacheeProfile coachee={coachee} content={content} />
    )}
    {organization && showOrganization !== undefined && (
      <OrganizationProfile coachee={coachee} content={content} />
    )}
    {coach && <CoachProfile coach={coach} content={content} />}
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apollo = createApolloClient(session?.token)
  const userData: {
    coachee?: CoacheeDataType
    coach?: CoachDataType
    organization?: OrganizationDataType
  } = {}

  if (session?.user.role === userRoles.COACHEE) {
    const { data } = await apollo.query({
      query: GET_COACHEE_BY_ID,
      context: { ms: microServices.backend },
      variables: { id: session?.user.coachee?.id },
    })
    userData.coachee = data.findCoacheeById
    console.log(ctx.query, 'querieeeeeees')
    if (ctx?.query?.showOrganization) {
      let id = NaN,
        showOrganization = false
      if (data.findCoacheeById.isAdmin || data.findCoacheeById.canViewDashboard)
        id = data.findCoacheeById.organization.id
      else if (session.user.organization)
        id = session.user.organization.id as number
      console.log(id, ' the id heeeeeeeeeeeeeeeeeeeeeeeere')
      apollo
        .query({
          query: GET_ORGANIZATION_BY_ID,
          context: { ms: microServices.backend },
          variables: { id },
        })
        .then(({ data }) => (userData.organization = data.findOrganizationById))
    }
  }
  if (session?.user.role === userRoles.COACH)
    apollo
      .query({
        query: GET_COACH_BY_ID,
        context: { ms: microServices.backend },
        variables: { id: session?.user.coach?.id },
      })
      .then(
        ({ data }) => (userData.coach = data.findCoachById as CoachDataType)
      )

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
      coachee: userData.coachee
        ? { ...userData.coachee, user: session?.user }
        : null,
      organization: userData.organization
        ? { ...userData.organization, user: session?.user }
        : null,
      coach: userData.coach ? { ...userData.coach, user: session?.user } : null,
      showOrganization: ctx.query?.showOrganization || null,
      content: {
        userProfile: content.userProfile.data.attributes,
        changePassword: contentPass.changePassword.data.attributes,
      },
    },
  }
}

export default UserProfile
