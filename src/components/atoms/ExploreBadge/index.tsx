import Image from 'next/image'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/UI/ExploreBadge/badge.module.scss'

// types
import { FC } from 'react'

export const ExploreBadge: FC = () => (
  <Container fluid className={classes.badgeContainer}>
    <Row className={classes.row}>
      <Col xs={4} sm={3}>
        Explorar
      </Col>
      <Col xs={4} sm={3}>
        <Image
          width={100}
          height={56}
          className={classes.img}
          src='/icon/MINDFIT.svg'
          alt='Mindfit_Logo'
        />
      </Col>
    </Row>
  </Container>
)
