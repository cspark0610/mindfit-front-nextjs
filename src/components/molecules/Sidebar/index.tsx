// main tools
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Nut } from 'react-bootstrap-icons'
import { Container, Spinner } from 'react-bootstrap'

// styles
import classes from 'styles/Sidebar/sidebar.module.scss'

// types
import { Icon } from 'react-bootstrap-icons'
import { Session } from 'next-auth'
import { FC } from 'react'

type SidebarProps = {
  session: Session | null
  items: { label: string; url: string; icon: Icon }[] | undefined
}

export const Sidebar: FC<SidebarProps> = ({ session, items }) => (
  <aside className={classes.container}>
    <div>
      <Image
        src='/assets/icon/MINDFIT_WHITE.svg'
        width={80}
        height={40}
        alt='mindfit'
      />
      {session?.user && items ? (
        items.map((item, idx) => (
          <Container key={idx} className={classes.itemContainer}>
            <Link href={item.url}>
              <a className={classes.itemElement}>
                <item.icon />
                <span className={classes.itemElement_label}>{item.label}</span>
              </a>
            </Link>
          </Container>
        ))
      ) : (
        <Spinner animation='border' variant='white' />
      )}
    </div>
    <Link href='/settings'>
      <a className={classes.settings}>
        <Nut color='white' size={32} />
      </a>
    </Link>
  </aside>
)
