// main tools
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

// components
import { Layout } from 'components/organisms/Layout'

// styles
import styles from 'styles/Home.module.scss'

// types
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { data, status } = useSession()

  return (
    <Layout>
      <main className={styles.main}>
        <h1 className={styles.title}>
          {data && (
            <span onClick={() => signOut({ callbackUrl: '/login' })}>
              Sign out
            </span>
          )}
          {!data && (
            <Link href='/login'>
              <a>
                <span>Sign in</span>
              </a>
            </Link>
          )}
        </h1>
      </main>
    </Layout>
  )
}

export default Home
