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
      message: '¿Cómo te fue la semana, Carlos?',
      status: 'received',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '8 min',
      message:
        'Muy bien Sara! Puse en práctica las técnicas para ser más asertivo, y creo que mejoré bastante.',
      status: 'sent',
    },
    {
      user: {
        name: 'Sara Herrera',
        profilePicture: '/assets/images/avatar.png',
      },
      receivedDate: '5 min',
      message: 'Qué bueno. ¿Y qué cambios has notado?',
      status: 'received',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '4 min',
      message:
        'Me siento liberado, con menos carga psicológica. Y lo mejor de todo, es que no me siento culpable por decir que no.',
      status: 'sent',
    },
    {
      user: {
        name: 'Sara Herrera',
        profilePicture: '/assets/images/avatar.png',
      },
      receivedDate: '2 min',
      message:
        'Fantástico lo que me comentas. Nos vemos entonces mañana en la siguiente sesión que tienes agendada.',
      status: 'received',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '1 min',
      message:
        'Gracias Sara! Estoy deseando seguir con más técnicas. Me siento ya una persona nueva.',
      status: 'sent',
    },
    {
      user: {
        name: data?.user.name as string,
        profilePicture: '/assets/images/userAvatar.svg',
      },
      receivedDate: '1 min',
      message: 'Hasta mañana!',
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
