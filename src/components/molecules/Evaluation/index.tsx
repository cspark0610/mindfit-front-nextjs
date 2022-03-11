// main tools
import Link from 'next/link'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'

// styles
import classes from 'styles/Evaluation/evaluation.module.scss'

// types
import { FC } from 'react'

export const Evaluation: FC = () => (
  <>
    <Row className='mb-4'>
      <h4 className={`mb-4 fw-bold ${classes.title}`}>
        Resumen de la evaluación
      </h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea.
      </p>
    </Row>
    <Row md={2}>
      <Col>
        <Link href='/'>
          <a className={`fw-bold ${classes.more}`}>Ver mas...</a>
        </Link>
      </Col>
      <Col xs='auto'>
        <Button className={classes.button}>Realizar evaluación</Button>
      </Col>
    </Row>
  </>
)
