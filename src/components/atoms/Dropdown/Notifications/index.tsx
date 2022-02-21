// main tools
import { useState } from 'react'

// components
import { Toasts } from 'components/atoms/Toasts'

// bootstrap components
import { Dropdown } from 'react-bootstrap'

// prime components
import { PrimeIcons } from 'primereact/api'
import { Badge } from 'primereact/badge'

// styles
import classes from 'styles/Navbar/navbar.module.scss'

// types
import { FC } from 'react'

export const Notifications: FC = () => {
  const [list, setList] = useState([
    'notification 1',
    'notification 2',
    'notification 3',
  ])

  const remove = (e: number) => {
    const newData = list.filter((_, idx) => idx != e)
    setList(newData)
  }

  return (
    <Dropdown align='end'>
      <Dropdown.Toggle className={classes.dropdown} id='notifications'>
        <i
          className={`p-overlay-badge ${PrimeIcons.BELL} ${classes.notifications}`}>
          {list.length > 0 && (
            <Badge
              value={list.length}
              className={classes.notifications_badge}
            />
          )}
        </i>
      </Dropdown.Toggle>
      <Dropdown.Menu className={classes.dropdown_menu}>
        {list.length != 0 ? (
          list.map((item, idx) => (
            <Toasts
              key={idx}
              title={item}
              message='Mensaje'
              onClose={() => remove(idx)}
            />
          ))
        ) : (
          <h6>sin notificaciones...</h6>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
