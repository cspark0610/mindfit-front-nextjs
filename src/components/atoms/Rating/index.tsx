//next components
import { useState } from 'react'

// bootstrap components
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'

// components

//styles
import classes from 'styles/Rating/rating.module.scss'

//types
import { FC } from 'react'
import { Rating } from 'primereact/rating'

export const Ratings: FC = () => {
  const [conversation, setConversation] = useState(1)
  const [comments, setComments] = useState(1)
  const [objectives, setObjectives] = useState(1)

  return (
    <Container className={classes.section}>
      <h5>Feedback de la sesion</h5>
      <Row md={2} className={classes.stars}>
        <Rating
          value={conversation}
          cancel={false}
          onChange={(e: any) => setConversation(e.value)}
        />
        <p>Comentarios</p>
        <Rating
          value={comments}
          cancel={false}
          onChange={(e: any) => setComments(e.value)}
        />
        <p>Objetivos</p>
        <Rating
          value={objectives}
          cancel={false}
          onChange={(e: any) => setObjectives(e.value)}
        />
        <p>Conversación</p>
      </Row>
    </Container>
  )
}
