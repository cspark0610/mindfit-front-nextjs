import { Navbar } from 'components/molecules/Navbar'
import { Sidebar } from 'components/molecules/Sidebar'
import 'bootstrap-icons/font/bootstrap-icons.css'

interface Props {
  children: React.ReactNode
}
export const Layout: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <div className='layout'>
      <Sidebar />
      <div className='sidebar--separator'>
        <Navbar />
        <div className='view-content'>{props.children}</div>
      </div>
    </div>
  )
}
