// main tools
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Dropdown, Button } from 'react-bootstrap'

// utils
import { userRoles } from 'utils/enums'

// styles
import classes from 'styles/Navbar/navbar.module.scss'

// types
import { fileDataType } from 'types/models/Files'
import { FC } from 'react'

export const DropdownMenu: FC = () => {
  const { data } = useSession()

  const profilePicture =
    data?.user.role === userRoles.COACH
      ? (data?.user.coach?.profilePicture as fileDataType)?.location
      : (data?.user.coachee?.profilePicture as fileDataType)?.location

  return (
    <>
      {data ? (
        <Dropdown align='end'>
          <Dropdown.Toggle className={classes.dropdown} id='dropdownMenu'>
            {profilePicture && (
              <Image
                width={72}
                height={72}
                alt='profile picture'
                src={profilePicture}
                className={classes.avatar}
              />
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className={classes.dropdown_menu}>
            <Link href={`/user/profile`} passHref>
              <Dropdown.Item>Perfil de usuario</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            {data.user.role === userRoles.COACHEE_OWNER && (
              <>
                <Link href={`/user/profile?showOrganization=true`} passHref>
                  <Dropdown.Item>Perfil de organización</Dropdown.Item>
                </Link>
                <Dropdown.Divider />
              </>
            )}
            <Dropdown.Item onClick={() => signOut({ callbackUrl: '/' })}>
              Cerrar sesión
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <Link href='/' passHref>
          <Button>Iniciar sesión</Button>
        </Link>
      )}
    </>
  )
}
