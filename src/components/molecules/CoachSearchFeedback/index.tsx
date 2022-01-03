// Styles
import { Container, Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/CoachSearchFeedback/coachSearchFeedback.module.scss'

export const CoachSearchFeedback = () => {
  return (
    <div>
      <h2>¿No estás satisfecho con los coach sugeridos?</h2>
      <Container>
        <Row>
          <p>Puedes indicarnos ¿por qué no?</p>
        </Row>
      </Container>
    </div>
  )
}
