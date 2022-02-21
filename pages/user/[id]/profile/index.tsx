// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { ProfileForm } from 'components/organisms/ProfileForm'

// commons
import { microServices } from 'commons'

// gql
import { initializeApolloClient } from 'lib/apollo'
import USER_PROFILE from 'lib/queries/User/findUserById.gql'
import PROFILE_CONTENT from 'lib/strapi/queries/UserProfile/content.gql'
import CHANGE_PASSWORD_CONTENT from 'lib/strapi/queries/ChangePassword/page.gql'

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
        <ProfileForm data={data} content={content} />
      </Container>
    </Container>
  </Layout>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  const id = session?.user.sub
  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: USER_PROFILE,
    variables: { id },
    context: { ms: microServices.backend },
  })

  const { data: content } = await apolloClient.query({
    query: PROFILE_CONTENT,
    context: { ms: microServices.strapi },
  })

  const { data: contentPass } = await apolloClient.query({
    query: CHANGE_PASSWORD_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      data: data.findUserById,
      content: {
        ...content.userProfile.data.attributes,
        ...contentPass.changePassword.data.attributes,
      },
    },
  }
}

export default UserProfile