// components
import { Navbar } from 'components/molecules/Navbar'
import { Sidebar } from 'components/molecules/Sidebar'

// styles
import classes from 'styles/Layout/layout.module.scss'

// types
import { FC } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export const Layout: FC = ({ children }) => {
  const session = useSession()
  const router = useRouter()
  console.log(session)
  if (session?.data?.user?.isVerified === false) router.push('/verify-user')

  return (
    <>
      <aside className={classes.sidebar}>
        <Sidebar />
      </aside>
      <div className={classes.container}>
        <Navbar />
        <main>{children}</main>
      </div>
    </>
  )
}
