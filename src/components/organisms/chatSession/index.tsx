import { useState, useEffect, useRef } from 'react'

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
  const [backToBottom, setBackToBottom] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)

  const goBottom = () => chatRef.current?.scrollIntoView({ block: 'end' })

  const handleChatScroll = (ev: any) => {
    const { target } = ev
    setBackToBottom(
      target.scrollHeight - target.offsetHeight > target.scrollTop + 300
    )
  }

  useEffect(() => goBottom(), [])

  return (
    <Container className={classes.section}>
      <Row onScroll={handleChatScroll} className={classes.container}>
        <div ref={chatRef}>
          {backToBottom && (
            <Button onClick={goBottom} className={classes.container_back}>
              <CapslockFill />
            </Button>
          )}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => (
            <MessageChat key={idx} />
          ))}
        </div>
      </Row>
      <InputChat/>
    </Container>
  )
}
