// main tools
import Link from 'next/link'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// styles
import classes from 'styles/Note/note.module.scss'

// types
import { FC } from 'react'

export const Note: FC = () => {
  return (
    <Container className={classes.section}>
      <Row xs={2} className={classes.date}>
        <Col xs='auto'>10/12/21</Col>
        <Col xs='auto'>09:30 AM</Col>
      </Row>
      <Row>
        <p className={classes.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor
        </p>
        <Link href='/'>Ver mas...</Link>
      </Row>
    </Container>
  )
}
