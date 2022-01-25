// bootstrap components
import { Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/Choose-plan/page.module.scss'

// types
import { FC } from 'react'

export const ActualPlan: FC<{ content: any }> = ({ content }) => (
  <Row className={classes.banner}>
    <Col xs={12}>
      <h1 className={classes.banner_title}>{content.currentPlan.label}</h1>
    </Col>
    <Col xs={12}>
      <h4 className={classes.banner_subtitle}>Básico</h4>
    </Col>
    <Col xs={12}>
      <p className={classes.banner_description}>{content.currentPlan.value}</p>
    </Col>
  </Row>
)
