// main tools
import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'

// bootstrap components
import { Container, Row, Button } from 'react-bootstrap'
import { CapslockFill } from 'react-bootstrap-icons'

// components
import { InputChat } from 'components/molecules/ChatInput'
import { MessageChat } from 'components/atoms/MessageChat'

// styles
import classes from 'styles/Chat/dashboardChat.module.scss'

// types
import { FC } from 'react'

export const ChatSession: FC = () => {
  const { data } = useSession()
  const [backToBottom, setBackToBottom] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const [conversation, setConversation] = useState([
    {
      user: {
        name: 'Sara Herrera',
        profilePicture: '/assets/images/avatar.png',
      },
      receivedDate: '12 min',
      message: 'How was your week, Carlos?',
      status: 'received',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '8 min',
      message:
        'Very good Sara! I put into practice the techniques to be more assertive, and I think I improved a lot.',
      status: 'sent',
    },
    {
      user: {
        name: 'Sara Herrera',
        profilePicture: '/assets/images/avatar.png',
      },
      receivedDate: '5 min',
      message: "That's good. And what changes have you noticed?",
      status: 'received',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '4 min',
      message:
        "I feel liberated, with less psychological burden. And best of all, I don't feel guilty about saying no.",
      status: 'sent',
    },
    {
      user: {
        name: 'Sara Herrera',
        profilePicture: '/assets/images/avatar.png',
      },
      receivedDate: '2 min',
      message:
        'Fantastic what you are telling me. See you tomorrow at the next session you have scheduled.',
      status: 'received',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '1 min',
      message:
        'Thank you Sara! I am looking forward to more techniques. I feel like a new person already.',
      status: 'sent',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '1 min',
      message: 'See you tomorrow!',
      status: 'sent',
    },
  ])

  const goBottom = () => chatRef.current?.scrollIntoView({ block: 'end' })

  const handleChatScroll = (ev: any) => {
    const { target } = ev
    setBackToBottom(
      target.scrollHeight - target.offsetHeight > target.scrollTop + 300
    )
  }

  useEffect(() => goBottom(), [conversation])

  return (
    <Container className={classes.section}>
      <Row onScroll={handleChatScroll} className={classes.container}>
        <div ref={chatRef}>
          {backToBottom && (
            <Button onClick={goBottom} className={classes.container_back}>
              <CapslockFill />
            </Button>
          )}
          {conversation.map((item, idx) => (
            <MessageChat {...item} key={idx} />
          ))}
        </div>
      </Row>
      <InputChat updateChat={setConversation} />
    </Container>
  )
}
