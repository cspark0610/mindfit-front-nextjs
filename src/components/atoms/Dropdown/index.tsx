// main tools
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { signOut, useSession } from 'next-auth/react'

// bootstrap components
import { Dropdown } from 'react-bootstrap'

// styles
import classes from 'styles/Navbar/navbar.module.scss'

// types
import { FC } from 'react'

export const DropdownMenu: FC = () => {
  const { data } = useSession()
  const { push } = useRouter()

  return (
    <>
      {data ? (
        <Dropdown align='end'>
          <Dropdown.Toggle className={classes.dropdown} id='dropdownMenu'>
            <Image
              className={classes.avatar}
              src='/assets/images/avatar.png'
              width={72}
              height={72}
              alt='user avatar'
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className={classes.dropdown_menu}>
            <Dropdown.Item onClick={() => push('/user')}>
              User Dashboar
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
              SignOut
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link href='/login'>SignIn</Link>
      )}
    </>
  )
}
