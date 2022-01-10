// main tools
import { SessionProvider } from 'next-auth/react'
import UseApollo from '../lib/apollo'

// styles
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'styles/theme.scss'

// types
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
//wrapps all pages with apollo provider
export default UseApollo(MyApp)
