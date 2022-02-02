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
      <Row xs='auto' className={classes.date}>
        <p>10/12/21</p>
        <p>09:30 AM</p>
      </Row>
      <Row>
        <p className={classes.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </p>
        <Link href='/'>Ver mas...</Link>
      </Row>
    </Container>
  )
}
