// main tools
import Image from 'next/image'

// bootstrap components
import { Container, Row, Col, Badge } from 'react-bootstrap'

// styles
import classes from 'styles/Chat/cardChat.module.scss'

// types
import { FC } from 'react'

export const CardChat: FC = () => {
  return (
    <Container className={classes.section}>
      <Row>
        <Col xs={3}>
          <Image
            width={70}
            height={70}
            alt='user avatar'
            className={classes.avatar}
            src='/assets/images/avatar.png'
          />
        </Col>
        <Col xs={9}>
          <Row xs='auto' className={classes.data}>
            <p>Camila</p>
            <p>33 min</p>
          </Row>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className={classes.notification}>
            <Badge bg='secondary'>1</Badge>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
