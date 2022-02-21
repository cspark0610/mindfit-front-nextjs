// main tools
import Image from 'next/image'
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/Chat/messageChat.module.scss'

// types
import { FC } from 'react'

type MessageChatProps = {
  user: { name: string; profilePicture: string }
  status: string
  message: string
  receivedDate: string
}

export const MessageChat: FC<MessageChatProps> = (props) => (
  <Container className={classes.section}>
    <Row className={classes[props.status]}>
      <Col xs={4}>
        <Image
          className={classes.avatar}
          src={props.user.profilePicture}
          width={100}
          height={100}
          alt='user avatar'
        />
      </Col>
      <Col xs={8}>
        <Row xs='auto' className={classes.data}>
          <p>{props.user.name}</p>
          <p>{props.receivedDate}</p>
        </Row>
        <p>{props.message}</p>
      </Col>
    </Row>
  </Container>
)
