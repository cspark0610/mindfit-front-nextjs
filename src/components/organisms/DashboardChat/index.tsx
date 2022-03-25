import { useState, useEffect, useRef } from 'react'

// bootstrap components
import { Container, Row, Button } from 'react-bootstrap'
import { Sticky, CapslockFill } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'

// components
import { CardChat } from 'components/molecules/CardChat'

// styles
import classes from 'styles/Chat/dashboardChat.module.scss'

// types
import { FC } from 'react'
import { PrimeIcons } from 'primereact/api'

export const DashboardChat: FC = () => {
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
      <form className={`p-input-icon-right ${classes.searcher}`}>
        <i className={`${classes.inputIcon} ${PrimeIcons.SEARCH}`} />
        <InputText
          type='search'
          placeholder='Buscar'
          className={classes.input}
        />
      </form>
      <div className='mb-3 d-flex justify-content-between'>
        <h5>Mensajes</h5>
        <Button className={classes.buttonIcon} variant='light'>
          <Sticky size={28} />
        </Button>
      </div>
      <Row onScroll={handleChatScroll} className={classes.container}>
        <div ref={chatRef}>
          {backToBottom && (
            <Button onClick={goBottom} className={classes.container_back}>
              <CapslockFill />
            </Button>
          )}
          {[0, 1, 2, 3, 4, 5].map((item, idx) => (
            <CardChat key={idx} />
          ))}
        </div>
      </Row>
    </Container>
  )
}
