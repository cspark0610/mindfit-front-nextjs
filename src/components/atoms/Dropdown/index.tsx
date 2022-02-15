// main tools
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

// bootstrap components
import { Dropdown } from 'react-bootstrap'

// types
import React, { ComponentType, FC } from 'react'

export const DropdownMenu: FC = ({ children }) => {
  const { data } = useSession()
  const { push } = useRouter()

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

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        {children}
      </Dropdown.Toggle>
      <Dropdown.Menu rootCloseEvent='mousedown'>
        <Dropdown.Item onClick={() => push('/user')}>
          User Dashboar
        </Dropdown.Item>
        <Dropdown.Divider />
        {data ? (
          <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
            SignOut
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={() => push('/login')}>SignIn</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  )
}
