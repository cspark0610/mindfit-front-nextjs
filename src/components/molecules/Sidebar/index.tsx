import { v4 as uuidv4 } from 'uuid'
import { Item } from './Item'
import classes from 'styles/Sidebar/sidebar.module.scss'
import {
  Calendar,
  ChatRightText,
  Journal,
  LayoutWtf,
} from 'react-bootstrap-icons'

export const Sidebar = () => {
  const items = [
    {
      id: 's-el-i-0',
      icon: 'Journal',
      url: 'index',
    },
    {
      id: 's-el-i-1',
      icon: 'Calendar',
      url: 'index',
    },
    {
      id: 's-el-i-2',
      icon: 'LayoutWtf',
      url: 'index',
    },
    {
      id: 's-el-i-3',
      icon: 'ChatRightText',
      url: 'index',
    },
  ]

  return (
    <aside className={classes.sidebarContainer}>
      <div className='sidebar--logo-container'>
        <h3>MindFit</h3>
      </div>
      <div className='sidebar--items-container'>
        {items.map((i) => (
          <Item key={i.id} icon={i.icon} url={i.url} />
        ))}
      </div>
      <div className='sidebar--settings-item'>
        <Item icon='Nut' background={false} url='settings' />
      </div>
    </aside>
  )
}
