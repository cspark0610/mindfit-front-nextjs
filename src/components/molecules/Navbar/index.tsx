// main tools
import Image from 'next/image'
import { PrimeIcons } from 'primereact/api'

// components
import { DropdownMenu } from 'components/atoms/Dropdown'
import { Notifications } from 'components/atoms/Dropdown/Notifications'

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

// prime components
import { Badge } from 'primereact/badge'

// sidebar items
import { items } from 'components/molecules/Sidebar/items'

// styles
import classes from 'styles/Navbar/navbar.module.scss'

// types
import { FC } from 'react'

export const Navbar: FC = () => (
  <Container fluid className={classes.container}>
    <Row className={classes.row}>
      <Col className={classes.profile} xs={1}>
        <DropdownMenu>
          <Image
            className={classes.avatar}
            src='/assets/images/avatar.png'
            width={72}
            height={72}
            alt='user avatar'
          />
        </DropdownMenu>
        <Notifications>
          <i
            className={`p-overlay-badge ${PrimeIcons.BELL} ${classes.notifications}`}>
            <Badge value={3} className={classes.notifications_badge} />
          </i>
        </Notifications>
      </Col>
      <Col xs={1}>
        <BsNavbar className={classes.menuMobile} expand={false} variant='light'>
          <BsNavbar.Toggle />
          <BsNavbar.Offcanvas className={classes.sidebar}>
            <Offcanvas.Header closeButton>
              <Image
                src='/assets/icon/MINDFIT.svg'
                alt='mindfit'
                width={150}
                height={72}
                className={classes.avatar}
              />
            </Offcanvas.Header>
            <Offcanvas.Body className={classes.sidebar_body}>
              <Container>
                {items.map((item, idx) => (
                  <Nav.Link
                    className={classes.sidebar_item}
                    key={idx}
                    href={item.url}>
                    <item.icon className={classes.sidebar_item_icon} />{' '}
                    {item.label}
                  </Nav.Link>
                ))}
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
