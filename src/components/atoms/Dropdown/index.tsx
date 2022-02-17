// main tools
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Dropdown, Button } from 'react-bootstrap'

// styles
import classes from 'styles/Navbar/navbar.module.scss'

// types
import { FC } from 'react'

export const DropdownMenu: FC = () => {
  const { data } = useSession()

  return (
    <>
      {data ? (
        <Dropdown align='end'>
          <Dropdown.Toggle className={classes.dropdown} id='dropdownMenu'>
            <Image
              width={72}
              height={72}
              alt='user avatar'
              className={classes.avatar}
              src='/assets/images/avatar.png'
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className={classes.dropdown_menu}>
            <Link href={`/user/${data.user.sub}/profile`} passHref>
              <Dropdown.Item>User Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
              SignOut
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link href='/' passHref>
          <Button>Sign In</Button>
        </Link>
      )}
    </>
  )
}
