// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'
import { EmojiSmile, Send } from 'react-bootstrap-icons'

// styles
import classes from 'styles/SumaryResult/sumaryResult.module.scss'

// types
import { FC } from 'react'

export const SumaryResult: FC = () => {
  return (
    <Container className={classes.section}>
      <h6 className={classes.title}>
        <EmojiSmile className={classes.icon} />
        Motivación
      </h6>
      {[0, 1, 2].map((item, idx) => (
        <Row key={idx} className={classes.point}>
          <p>Delegar tres tareas dentro de tu equipo</p>
          <Col xs={2} className={classes.fill} />
          <Col xs={2} className={classes.fill} />
          <Col xs={2} className={classes.void} />
          <Col xs={2}>2/3</Col>
        </Row>
      ))}
    </Container>
  )
}
