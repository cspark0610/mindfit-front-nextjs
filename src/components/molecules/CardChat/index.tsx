// main tools
import Image from 'next/image'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// styles
import classes from 'styles/Chat/cardChat.module.scss'

// types
import { FC } from 'react'

export const CardChat: FC = () => {
  return (
    <Container className={classes.section}>
      <Row>
        <Col xs={4}>
          <Image
            className={classes.avatar}
            src='/assets/images/avatar.png'
            width={100}
            height={100}
            alt='user avatar'
          />
        </Col>
        <Col xs={8}>
          <Row xs='auto' className={classes.data}>
            <p>Camila</p>
            <p>33 min</p>
          </Row>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className={classes.notification}>
            <Button className={classes.notification} variant='secondary'>1</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
