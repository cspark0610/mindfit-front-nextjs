// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import REGISTER_ORG_CONTENT from 'lib/strapi/queries/createOrganization/page.gql'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { CompanySignup } from 'components/organisms/OrganizationSignup/Company'
import { GetSSPropsType } from 'types'

const CreateOrgPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => (
  <Container className={classes.container}>
    <Container fluid className={classes.section}>
      <CompanySignup content={content} />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/signup', permanent: false }, props: {} }
  if (session.user.organization)
    return {
      redirect: { destination: '/signup/organization', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: REGISTER_ORG_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.createOrganization.data.attributes } }
}

export default CreateOrgPage
