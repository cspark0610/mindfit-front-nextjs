// bootstrap components
import { Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { FC } from 'react'

export const ActualPlan: FC = () => (
  <Row className={classes.banner}>
    <Col xs={12}>
      <h1 className={classes.banner_title}>Plan Actual</h1>
    </Col>
    <Col xs={12}>
      <h4 className={classes.banner_subtitle}>Básico</h4>
    </Col>
    <Col xs={12}>
      <p className={classes.banner_description}>
        Haz utilizado <span className={classes.banner_green}>2</span> de tus{' '}
        <span className={classes.banner_blue}>5</span> registros disponibles
      </p>
    </Col>
  </Row>
)
