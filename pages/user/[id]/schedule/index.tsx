// main tools
import { getSession } from 'next-auth/react'

// gql
import { initializeApolloClient } from 'lib/apollo'
import { createApolloClient } from 'lib/apolloClient'
import GET_PAGE_CONTENT from 'lib/strapi/queries/UserSchedule/page.gql'
import GET_COACH_AGENDA from 'lib/queries/Coach/getAgenda.gql'
import GET_COACHEE_AGENDA from 'lib/queries/Coachee/getAgenda.gql'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { CoachSchedule } from 'components/organisms/Schedule/CoachSchedule'
import { CoacheeSchedule } from 'components/organisms/Schedule/CoacheeSchedule'

// utils
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// types
import { GetSSPropsType } from 'types'
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'
import { GetServerSidePropsContext, NextPage } from 'next'

const AgendaPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coacheeAgenda,
  coachAgenda,
  content,
}) => (
  <Layout>
    <Container className='my-5'>
      {coacheeAgenda && (
        <CoacheeSchedule coachee={coacheeAgenda} content={content} />
      )}
      {coachAgenda && <CoachSchedule coach={coachAgenda} content={content} />}
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apollo = createApolloClient(session.token)
  const userData: { coachee?: CoacheeDataType; coach?: CoachDataType } = {}

  if (session.user.role === userRoles.COACHEE)
    await apollo
      .query({
        query: GET_COACHEE_AGENDA,
        context: { ms: microServices.backend },
        variables: { id: session?.user.coachee?.id },
      })
      .then(
        ({ data }) =>
          (userData.coachee = data.getCoacheeProfile as CoacheeDataType)
      )
  if (session.user.role === userRoles.COACH)
    await apollo
      .query({
        query: GET_COACH_AGENDA,
        context: { ms: microServices.backend },
        variables: { id: session?.user.coach?.id },
      })
      .then(
        ({ data }) => (userData.coach = data.findCoachById as CoachDataType)
      )

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: GET_PAGE_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      coacheeAgenda: userData.coachee
        ? { ...userData.coachee, user: session?.user }
        : null,
      coachAgenda: userData.coach
        ? { ...userData.coach, user: session?.user }
        : null,
      content: data.coacheeSchedule.data.attributes,
    },
  }
}

export default AgendaPage
