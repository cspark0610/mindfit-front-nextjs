// Main tools
import Image from 'next/image'

// Bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// Styles
import classes from 'styles/CoachProfileCard/CoachProfileCard.module.scss'

export const CoachProfileCard = () => {
  return (
    <Container>
      <div>
        <Image
          src='/static/images/avatar.png'
          alt='Mindfit Logo'
          width={182}
          height={182}
          layout='intrinsic'
          className={classes.images}
        />
      </div>
      <div></div>
      <div></div>
      <div></div>
    </Container>
  )
}
