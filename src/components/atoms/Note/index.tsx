// main tools
import Link from 'next/link'

// bootstrap components
import { Row } from 'react-bootstrap'

// styles
import classes from 'styles/Note/note.module.scss'

// types
import { FC } from 'react'

export const Note: FC = () => {
  return (
    <Row className={classes.section}>
      <h6>10/12/21</h6>
      <h6>09:30 AM</h6>
      <p className={classes.paragraph}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </p>
      <Link href='/'>Ver mas...</Link>
    </Row>
  )
}
