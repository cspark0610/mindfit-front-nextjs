// Components
import { Toasts } from 'components/atoms/Toasts'

// bootstrap components
import { Col, Dropdown, Row } from 'react-bootstrap'

// styles
import classes from 'styles/UI/Dropdown/dropdown.module.scss'

// types
import React, { ComponentType, FC, useState } from 'react'
import { DropdownMenuProps } from 'react-bootstrap/esm/DropdownMenu'

export const Notifications: FC = ({ children }) => {
  const notifications = ['notification 1', 'notification 2', 'notification 3']
  const [list, setList] = useState(notifications)

  const remove = (e: any) => {
    const newData = list.filter((item, idx) => idx != e)
    setList(newData)
  }

  const CustomToggle: ComponentType<{
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {}
  }> = React.forwardRef(({ children, onClick }, ref) => (
    <a
      ref={ref}
      href=''
      onClick={(e) => {
        e.preventDefault()
        onClick(e) ?? null
      }}>
      {children}
    </a>
  ))

  const CustomMenu: FC<DropdownMenuProps> = React.forwardRef(
    ({ children, className }, ref) => (
      <Row ref={ref} className={`${classes.menu} ${className}`}>
        <Col>{children}</Col>
      </Row>
    )
  )

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        {children}
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
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
          <p>sin notificaciones</p>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
