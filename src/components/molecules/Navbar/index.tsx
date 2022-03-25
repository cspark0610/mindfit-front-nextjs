// main tools
import Image from 'next/image'

// components
import { Notifications } from 'components/atoms/Dropdown/Notifications'
import { ChooseLanguage } from 'components/atoms/ChooseLanguage'
import { DropdownMenu } from 'components/atoms/Dropdown'

// bootstrap components
import {
  Col,
  Container,
  Row,
  Navbar as BsNavbar,
  Offcanvas,
  Nav,
} from 'react-bootstrap'
import { Nut } from 'react-bootstrap-icons'

// styles
import classes from 'styles/Navbar/navbar.module.scss'

// types
import { Icon } from 'react-bootstrap-icons'
import { Session } from 'next-auth'
import { FC } from 'react'

type NavbarProps = {
  session: Session | null
  items?: { label: string; url: string; icon: Icon }[]
}

export const Navbar: FC<NavbarProps> = ({ session, items }) => (
  <Container fluid className={classes.container}>
    <Row className={classes.row}>
      <Col className={classes.profile} xs={1}>
        <DropdownMenu />
        <ChooseLanguage />
        {session && <Notifications />}
      </Col>
      <Col xs={1}>
        <BsNavbar className={classes.menuMobile} expand={false} variant='light'>
          <BsNavbar.Toggle className='me-4' />
          <BsNavbar.Offcanvas className={classes.sidebar}>
            <Offcanvas.Header closeButton>
              <Image
                width={150}
                height={72}
                alt='mindfit'
                className={classes.avatar}
                src='/assets/icon/MINDFIT.svg'
              />
            </Offcanvas.Header>
            <Offcanvas.Body className={classes.sidebar_body}>
              <Container>
                {session?.user && (
                  <>
                    {items &&
                      items.map((item, idx) => (
                        <Nav.Link
                          className={classes.sidebar_item}
                          key={idx}
                          href={item.url}>
                          <item.icon className={classes.sidebar_item_icon} />{' '}
                          {item.label}
                        </Nav.Link>
                      ))}
                  </>
                )}
              </Container>
              <Nav.Link className={classes.sidebar_settings} href='/settings'>
                <Nut className={classes.sidebar_settings_icon} /> Configuracion
              </Nav.Link>
            </Offcanvas.Body>
          </BsNavbar.Offcanvas>
        </BsNavbar>
      </Col>
    </Row>
  </Container>
)
