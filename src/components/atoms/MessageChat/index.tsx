// main tools
import Image from 'next/image'
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/Chat/messageChat.module.scss'

// types
import { FC } from 'react'

export const MessageChat: FC = () => {
  const [user, setUser] = useState('received')

  return (
    <Container className={classes.section}>
      <Row className={classes[user]}>
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Col>
      </Row>
    </Container>
  )
}
