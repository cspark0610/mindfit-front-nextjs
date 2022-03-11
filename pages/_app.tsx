// Next components
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
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

// prime components
import { ScrollTop } from 'primereact/scrolltop'
import { BlockUI } from 'primereact/blockui'

// bootstrap components
import { Spinner, SSRProvider } from 'react-bootstrap'

// types
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState)
  const [loadingPage, setLoadingPage] = useState(false)
  const router = useRouter()

  /**
   * Navbar animation controller on scroll and Page transition loader
   */
  useEffect(() => {
    router.events.on('routeChangeStart', () => setLoadingPage(true))
    router.events.on('routeChangeComplete', () => setLoadingPage(false))

    return () => {
      router.events.off('routeChangeComplete', () => setLoadingPage(false))
    }
  }, [router])

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
        <SessionProvider refetchInterval={60 * 60} session={pageProps.session}>
          <SSRProvider>
            <Component {...pageProps} />
            <BlockUI
              fullScreen
              blocked={loadingPage}
              template={<Spinner animation='grow' />}
            />
            <ScrollTop />
          </SSRProvider>
        </SessionProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
