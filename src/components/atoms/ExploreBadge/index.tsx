import Link from 'next/link'
import Image from 'next/image'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/UI/ExploreBadge/badge.module.scss'

// types
import { FC } from 'react'

export const ExploreBadge: FC = () => (
  <Container fluid className={classes.badgeContainer}>
    <Link passHref href='/'>
      <Row as='a' className={classes.row}>
        <Col xs={6} sm={4}>
          Explorar
        </Col>
        <Col xs={6} sm={4}>
          <Image
            width={100}
            height={56}
            className={classes.img}
            src='/assets/icon/MINDFIT.svg'
            alt='Mindfit_Logo'
          />
        </Col>
      </Row>
    </Link>
  </Container>
)
