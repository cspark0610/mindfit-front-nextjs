// Main tools
import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Image from 'next/image'

// Components
import { ForgottenPassword } from 'components/molecules/ForgottenPassword'
import { LoginCard } from 'components/molecules/Login'

// utils
import { microServices } from 'commons'

// gql
import { initializeApolloClient } from 'lib/apollo'
import LOGIN_CONTENT from 'lib/strapi/queries/Login/content.gql'

// bootstrap components
import { Container } from 'react-bootstrap'

// Styles
import classes from 'styles/Login/page.module.scss'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { GetSSPropsType } from 'types'

const LoginPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  const [toggleView, setToggleView] = useState(false)
  return (
    <Container className={classes.container}>
      <Image
        width={420}
        height={250}
        alt='Mindfit Logo'
        layout='intrinsic'
        src='/assets/icon/MINDFIT.svg'
      />
      {toggleView ? (
        <ForgottenPassword setToggleView={setToggleView} content={content} />
      ) : (
        <LoginCard setToggleView={setToggleView} content={content} />
      )}
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (session)
    return {
      redirect: { destination: '/dashboard/coachee', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: LOGIN_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return { props: { content: data.login.data.attributes } }
}

export default LoginPage
