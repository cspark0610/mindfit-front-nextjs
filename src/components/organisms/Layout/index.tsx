import { Navbar } from 'components/molecules/Navbar'
import { Sidebar } from 'components/molecules/Sidebar'
import { FC } from 'react'
import classes from 'styles/Sidebar/sidebar.module.scss'

interface Props {
  children: React.ReactNode
}
export const Layout: FC<Props> = (props: Props) => {
  return (
    <div className='layout'>
      <Sidebar />
      <div className={classes.sidebarSeparator}>
        <Navbar />
        <section className='view-content'>{props.children}</section>
      </div>
    </div>
  )
}
