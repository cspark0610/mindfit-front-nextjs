import Image from 'next/image'
import { Badge, Button, Col, Container, Row } from 'react-bootstrap'
import classes from 'styles/Navbar/navbar.module.scss'
import { Bell } from 'react-bootstrap-icons'
export const Navbar = () => {
  return (
    <Container fluid>
      <Row>
        <Col className={classes.navbarContainer}>
          <div className={classes.avatar}>
            <Image
              src='/static/images/avatar.png'
              width={72}
              height={72}
              alt='user avatar'
            />
          </div>
          <div className={classes.notifications}>
            <div className={classes.item}>
              <Button className={classes.btn} type='button' variant='link'>
                <Bell size={24} />
              </Button>
              <Badge className={classes.badge} pill={true} text='white'>
                3
              </Badge>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
