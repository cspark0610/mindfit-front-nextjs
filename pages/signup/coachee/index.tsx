// main tools
import Image from 'next/image'
import { getSession } from 'next-auth/react'

// gql
import { initializeApolloClient } from 'lib/apollo'
import CREATE_PASS_CONTENT from 'lib/strapi/queries/Colaborator/createPassContent.gql'

// utils
import { microServices } from 'commons'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { FirstColaboratorLogin } from 'components/molecules/FirstColaboratorLogin'

// styles
import classes from 'styles/signup/colaborator.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const SignupOrgPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  hash,
  error,
}) => {
  return (
    <Container className={classes.container}>
      <h1 className={classes.title}>{content?.title}</h1>
      <div>
        <Image
          src='/assets/icon/MINDFIT.svg'
          alt='Mindfit Logo'
          width={420}
          height={150}
        />
      </div>
      <FirstColaboratorLogin
        error={error as string}
        hash={hash as string}
        content={content}
      />
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (session?.user)
    return {
      redirect: { destination: '/signup/coachee/user', permanent: false },
      props: {},
    }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: CREATE_PASS_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const { token, error } = ctx.query

  return {
    props: {
      content: data.collaboratorCreatePass.data.attributes,
      hash: token,
      error: error ?? '',
    },
  }
}

export default SignupOrgPage
