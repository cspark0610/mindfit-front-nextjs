// bootstrap components
import { Col, Row } from 'react-bootstrap'

// styles
import classes from 'styles/UI/Card/stepsCard.module.scss'

// types
import { FC } from 'react'
import { NextStepProps } from 'types/StepsCard'

export const NextStep: FC<NextStepProps> = ({ label }) => (
  <Row className={classes.row}>
    <Col xs={12} className={classes.label}>
      {label}
    </Col>
  </Row>
)
