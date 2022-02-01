// bootstrap components
import { Col, Row } from 'react-bootstrap'
import { EmojiSmile, Send } from 'react-bootstrap-icons'

// styles
import classes from 'styles/SumaryResult/sumaryResult.module.scss'

// types
import { FC } from 'react'

export const SumaryResult: FC = () => {
  return (
    <Row className={classes.section}>
      <h6>
        <EmojiSmile className={classes.icon} />
        Motivación
      </h6>
      <p>Delegar tres tareas dentro de tu equipo</p>
      <Col xs={2} className={classes.fill}></Col>
      <Col xs={2} className={classes.fill}></Col>
      <Col xs={2} className={classes.void}></Col>
      <Col xs={2}>
      <p>2/3</p>
      </Col>
      <p>Delegar tres tareas dentro de tu equipo</p>
      <Col xs={2} className={classes.fill}></Col>
      <Col xs={2} className={classes.fill}></Col>
      <Col xs={2} className={classes.void}></Col>
      <Col xs={2}>
      <p>2/3</p>
      </Col>
      <p>Delegar tres tareas dentro de tu equipo</p>
      <Col xs={2} className={classes.fill}></Col>
      <Col xs={2} className={classes.fill}></Col>
      <Col xs={2} className={classes.void}></Col>
      <Col xs={2}>
      <p>2/3</p>
      </Col>
    </Row>
  )
}
