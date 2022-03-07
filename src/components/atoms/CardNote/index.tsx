// main tools
import Link from 'next/link'

// bootstrap components
import { Container, Row } from 'react-bootstrap'

// styles
import classes from 'styles/CardNote/cardNote.module.scss'

// types
import { FC } from 'react'

export const CardNote: FC<{ note: string }> = ({ note }) => {
  return (
    <Container className={`mb-3 ${classes.section}`}>
      <Row xs='auto' className={classes.date}>
        <p>10/12/21</p>
        <p>09:30 AM</p>
      </Row>
      <Row className={classes.paragraph}>
        <div
          dangerouslySetInnerHTML={{
            __html: note,
          }}
        />
        <Link href='/'>
          <a>Ver mas...</a>
        </Link>
      </Row>
    </Container>
  )
}
