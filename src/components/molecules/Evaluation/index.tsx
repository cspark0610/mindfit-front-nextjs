// main tools
import Link from 'next/link'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'

// styles
import classes from 'styles/Evaluation/evaluation.module.scss'

// types
import { FC } from 'react'

export const Evaluation: FC<{ content: any }> = ({ content }) => (
  <>
    <Row className='mb-4'>
      <h4 className={`mb-4 fw-bold ${classes.title}`}>
        {content.evaluationTitle}
      </h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </Row>
    <Row md={2} className='align-items-center'>
      <Col>
        <span className={`fw-bold ${classes.more}`}>
          {content.seeMoreButton.label}...
        </span>
      </Col>
      <Col xs='auto'>
        <Button className={classes.button}>{content.testButton.label}</Button>
      </Col>
    </Row>
  </>
)
