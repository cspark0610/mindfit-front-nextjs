// main tools
import { getSession } from 'next-auth/react'

// bootstrap components
import { Container } from 'react-bootstrap'

// commons
import { microServices } from 'commons'

//gql
import { initializeApolloClient } from 'lib/apollo'
import COMPANYRREGISTER_VIEW from 'lib/queries/Organization/companyRegister.gql'

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
      <CompanySignup content={content?.view} contentForm={content?.form} />
    </Container>
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/signup', permanent: false }, props: {} }
  if (session.user.name === '1')
    return {
      redirect: { destination: '/signup/organization', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()
  const { data } = await apolloClient.query({
    query: COMPANYRREGISTER_VIEW,
    context: { ms: microServices.strapi },
  })
  const view = data.companyRegister.data.attributes
  const form = data.companyRegister.data.attributes.form.data.attributes

  return { props: { content: { view, form } } }
}

export default CreateOrgPage
