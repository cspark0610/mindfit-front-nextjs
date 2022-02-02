// components
import { Navbar } from 'components/molecules/Navbar'
import { Sidebar } from 'components/molecules/Sidebar'

// styles
import classes from 'styles/Layout/layout.module.scss'

// types
import { FC } from 'react'

export const Layout: FC = ({ children }) => {
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
