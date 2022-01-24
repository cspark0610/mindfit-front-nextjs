// Next components
import Head from 'next/head'

// main tools
import { SessionProvider } from 'next-auth/react'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from 'lib/apollo'

// styles
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'styles/theme.scss'

// types
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <>
      <Head>
        <title>Mindfit</title>
        <meta charSet='utf-8' />
        <meta name='author' content='The Centria Group' />
        <meta name='copyright' content='The Centria Group' />
        <meta name='keywords' content='Coach, Coachee, Organization' />
      </Head>

      <ApolloProvider client={apolloClient}>
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
