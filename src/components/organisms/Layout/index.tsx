// main tools
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'

// components
import { Navbar } from 'components/molecules/Navbar'
import { Sidebar } from 'components/molecules/Sidebar'

// utils
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// gql
import GET_COACHEE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import { useLazyQuery } from '@apollo/client'

// styles
import classes from 'styles/Layout/layout.module.scss'

// types
import { Icon } from 'react-bootstrap-icons'
import { FC } from 'react'

export const Layout: FC = ({ children }) => {
  const [items, setItems] = useState<
    { label: string; url: string; icon: Icon }[] | undefined
  >(undefined)
  const { data, status } = useSession()

  const [getCoachee] = useLazyQuery(GET_COACHEE, {
    context: { ms: microServices.backend },
  })

  useEffect(() => {
    if (data && data.user) {
      ;(async () => {
        switch (data.user?.role) {
          case userRoles.COACHEE:
            {
              const { data } = await getCoachee()

              if (data.getCoacheeProfile.canViewDashboard)
                await import('utils/navigationItems').then(
                  ({ coacheeWithOrgItems }) =>
                    setItems(coacheeWithOrgItems(data.user?.sub))
                )
              else
                await import('utils/navigationItems').then(({ coacheeItems }) =>
                  setItems(coacheeItems(data.user?.sub))
                )
            }
            break
          case userRoles.COACHEE_ADMIN:
          case userRoles.COACHEE_OWNER:
            {
              await import('utils/navigationItems').then(
                ({ coacheeWithOrgItems }) =>
                  setItems(coacheeWithOrgItems(data.user?.sub))
              )
            }
            break
          case userRoles.COACH:
            await import('utils/navigationItems').then(({ coachItems }) =>
              setItems(coachItems(data.user?.sub))
            )
            break
        }
      })()
    }
  }, [data, status, getCoachee])

  return (
    <>
      <aside className={classes.sidebar}>
        <Sidebar items={items} session={data} />
      </aside>
      <div className={classes.container}>
        <Navbar items={items} session={data} />
        <main>{children}</main>
      </div>
    </>
  )
}
