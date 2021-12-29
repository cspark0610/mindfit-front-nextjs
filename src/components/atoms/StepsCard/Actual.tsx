// bootstrap components
import { Col, Row } from 'react-bootstrap'

// styles
import classes from 'styles/UI/Card/stepsCard.module.scss'

// types
import { FC } from 'react'
import { ActualStepProps } from 'types/StepsCard'

export const ActualStep: FC<ActualStepProps> = ({ index, label }) => (
  <Row className={classes.row}>
    <Col xs={1} className={classes.mark}>
      {index}
    </Col>
    <Col xs={9} className={classes.label}>
      {label}
    </Col>
  </Row>
)
