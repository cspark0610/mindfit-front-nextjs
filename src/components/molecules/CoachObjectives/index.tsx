// Bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// Styles
// import classes from 'styles/CoachObjectives/coachObjectives.module.scss'
import classes from 'styles/CoachObjectives/coachObjectives.module.scss'

export const CoachObjectives = () => {
  return (
    <Container>
      <p className={`mb-2 fs-5 fw-bold ${classes.subtitle}`}>
        ¡Cumpliste tus objetivos!
      </p>
      <p className={`fs-6 fw-bold mb-0 ${classes.paragraph}`}>¡Sigue así!</p>
      <p className={`mb-4 fs-6 ${classes.paragraph}`}>
        Cumplir estas tareas te ayudara a desarrollar los cambios ue necesitas
        para mejorar tu productividad
      </p>
      <p className={`mb-3 fs-5 fw-bold ${classes.subtitle}`}>
        Tareas cumplidas
      </p>
    </Container>
  )
}
