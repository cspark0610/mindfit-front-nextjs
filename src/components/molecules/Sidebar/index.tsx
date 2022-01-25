// main tools
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Container } from 'react-bootstrap'
import { Nut } from 'react-bootstrap-icons'

// utils
import { items } from 'components/molecules/Sidebar/items'

// styles
import classes from 'styles/Sidebar/sidebar.module.scss'

export const Sidebar = () => (
  <aside className={classes.container}>
    <div>
      <Link href='/'>
        <a>
          <Image
            src='/assets/icon/MINDFIT_WHITE.svg'
            width={80}
            height={40}
            alt='mindfit'
          />
        </a>
      </Link>
      {items.map((item, idx) => (
        <Container key={idx} className={classes.itemContainer}>
          <Link href={item.url}>
            <a className={classes.itemElement}>
              <item.icon />
              <span className={classes.itemElement_label}>{item.label}</span>
            </a>
          </Link>
        </Container>
      ))}
    </div>
    <Link href='/settings'>
      <a className={classes.settings}>
        <Nut color='white' size={32} />
      </a>
    </Link>
  </aside>
)
