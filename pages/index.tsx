import { signOut } from 'next-auth/react'

import type { NextPage } from 'next'
import styles from 'styles/Home.module.scss'

const Home: NextPage = () => (
  <div className={styles.container}>
    <main className={styles.main}>
      <h1 className={styles.title}>
        <span onClick={() => signOut()}>Sign out</span>
      </h1>
    </main>
  </div>
)

export default Home
