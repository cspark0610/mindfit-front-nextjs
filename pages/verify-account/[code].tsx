//main tools
import Image from 'next/image'
import { getSession } from 'next-auth/react'

//components
import { VerifyUserCard } from 'components/molecules/VerifyUserCard'

// bootstrap components
import { Container } from 'react-bootstrap'

// gql
import { initializeApolloClient } from 'lib/apollo'
import GET_CONTENT from 'lib/strapi/queries/VerifyAccount/page.gql'

// utils
import { microServices } from 'commons'

// types
import { Session } from 'next-auth'
import { GetSSPropsType } from 'types'
import { NextPage, GetServerSidePropsContext } from 'next'

const VerifyAccount: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  code,
  session,
  content,
}) => (
  <Container className='d-flex flex-column align-items-center justify-content-center'>
    <Image
      src='/assets/icon/MINDFIT.svg'
      alt='Mindfit Logo'
      width={420}
      height={250}
      layout='intrinsic'
    />
    <VerifyUserCard
      code={code as string}
      session={session as Session}
      content={content}
    />
  </Container>
)

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx)
  if (!session)
    return { redirect: { destination: '/', permanent: false }, props: {} }

  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const code = ctx.params?.code

  return {
    props: { code, session, content: data.verifyUser.data.attributes },
  }
}

export default VerifyAccount
