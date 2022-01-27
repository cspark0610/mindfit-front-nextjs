import { Container, Row, Button } from 'react-bootstrap'
import classes from 'styles/Farewell/farewell.module.scss'

export const Farewell = () => {
  return (
    <Container className={`${classes.container} d-flex align-items-center`}>
      <Row xs={2}>
        <div>
          <p className={classes.header}>Hacia tu mejor versión</p>
          <h1 className={`${classes.title} mb-4`}>
            Ahora es tu <b>turno</b>
          </h1>
          <p className={`${classes.paragraph} mb-5`}>
            Posiblemente conozcas algo más de{' '}
            <b>la grandeza que llevas dentro.</b> Eres un ser único con un
            cerebro irrepetible, con un potencial enorme que pueda impactar
            positivamente en tu entorno. Ahora es el momento que te pongas a
            trabajar en ellos, en un viaje emocionante, y consigas{' '}
            <b>la mejor versión de ti mismo.</b> Todo está en tus manos.
          </p>
          <Button className={classes.button}>
            Accede a los recursos que te ayuden a alcanzar tu mejor versión
          </Button>
        </div>
        <div>
          <img src='/assets/icon/MINDFIT.svg' alt='' />
        </div>
      </Row>
    </Container>
  )
}
