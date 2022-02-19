// main tools
import { useRouter } from 'next/router'
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Calendar } from 'react-bootstrap-icons'

// utils
import { formatDate } from 'commons'

// styles
import classes from 'styles/coachAgenda/page.module.scss'

// types
import { FC } from 'react'

export const CoachEvent: FC<{
  date: string
  availability: { from: string; to: string }
  content: any
}> = ({ date, availability, content }) => {
  const { locale } = useRouter()
  const formatedDate = formatDate(date)

  return (
    <Container className={classes.container}>
      <Row className={classes.row}>
        <Col className={classes.calendar} xs={3} md={2}>
          <Calendar className={classes.calendar_icon} />
          <span className={classes.calendar_number}>
            {formatedDate.getDate()}
          </span>
          <span className={classes.calendar_date}>
            {formatedDate.toLocaleDateString(locale, { weekday: 'short' })}
          </span>
        </Col>
        <Col className={classes.info} xs={7} md={8}>
          <strong className={classes.info_title}>Sesión de Coaching</strong>
          <span className={classes.info_desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, error
            alias vero soluta similique cupiditate ipsa at voluptatum, harum
            voluptate itaque qui laboriosam voluptas atque laborum laudantium,
            dolorum dolor incidunt.
          </span>
        </Col>
        <Col xs={2}>
          <Image
            className={classes.avatar}
            src='/assets/images/avatar.png'
            width={50}
            height={50}
            alt='user avatar'
          />
        </Col>
      </Row>
      <Button className={classes.button}>{content.label}</Button>
    </Container>
  )
}
