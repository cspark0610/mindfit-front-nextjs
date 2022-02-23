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
    <Row>
      <Col className={classes[props.status]} xs={12}>
        <Image
          width={40}
          height={40}
          alt='user avatar'
          className={classes.avatar}
          src={props.user.profilePicture}
        />
        <div>
          <span className={classes.name}>{props.user.name}</span>
          <small>{props.receivedDate}</small>
        </div>
      </Col>
    </Row>
    <Row className={classes.content}>
      <span>{props.message}</span>
    </Row>
  </Container>
)
