// bootstrap components
import { Col, Row } from 'react-bootstrap'
import { Check2 } from 'react-bootstrap-icons'

// styles
import classes from 'styles/UI/Card/stepsCard.module.scss'

// types
import { FC } from 'react'
import { CompletedStepProps } from 'types/components/StepsCard'

export const CompletedStep: FC<CompletedStepProps> = ({ label }) => (
  <Row className={classes.row}>
    <Col xs={1} className={classes.mark}>
      <Check2 />
    </Col>
    <Col xs={9} className={classes.label}>
      {label}
    </Col>
  </Row>
)
