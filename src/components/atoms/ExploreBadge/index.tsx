// main tools
import { useRouter } from 'next/router'
import Image from 'next/image'

// bootstrap components
import { Container, Row, Col } from 'react-bootstrap'

// styles
import classes from 'styles/UI/ExploreBadge/badge.module.scss'

// types
import { FC } from 'react'

export const ExploreBadge: FC = () => {
  const { locale } = useRouter()

  return (
    <Container fluid className={classes.badgeContainer}>
      <Row className={classes.row}>
        <Col xs={6} sm={4}>
          {locale === 'en' ? 'Explore' : 'Explorar'}
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
    </Container>
  )
}
