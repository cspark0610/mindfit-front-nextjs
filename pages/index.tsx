import { signOut } from 'next-auth/react'

import type { NextPage } from 'next'
import styles from 'styles/Home.module.scss'
import { Layout } from 'components/organisms/Layout'

const Home: NextPage = () => (
  <Layout>
    <main className={styles.main}>
      <h1 className={styles.title}>
        <span onClick={() => signOut()}>Sign out</span>
      </h1>
    </main>
  </Layout>
)

export default Home
