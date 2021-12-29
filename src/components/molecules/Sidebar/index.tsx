import { v4 as uuidv4 } from 'uuid'
import { Item } from './Item'

export const Sidebar = () => {
  const items = [
    {
      icon: 'journal',
      url: 'index',
    },
    {
      icon: 'calendar',
      url: 'index',
    },
    {
      icon: 'layout-wtf',
      url: 'index',
    },
    {
      icon: 'chat-right-text',
      url: 'index',
    },
  ]

  return (
    <div className='sidebar-container d-flex flex-column align-items-center justify-content-around'>
      <div className='sidebar--logo-container'>
        <h3>MindFit</h3>
      </div>
      <div className='sidebar--items-container'>
        {items.map((i) => {
          return <Item key={uuidv4()} icon={i.icon} />
        })}
      </div>
      <div className='sidebar--settings-item'>
        <Item key={uuidv4()} icon='nut' background={false} url='settings' />
      </div>
    </div>
  )
}
