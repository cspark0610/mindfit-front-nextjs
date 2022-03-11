// main tools
import Image from 'next/image'
import dayjs from 'dayjs'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'
import { Lightbulb } from 'react-bootstrap-icons'

// utils
import { formatDate } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'

export const ScheduledAppointmentCard: FC<{ startDate: string }> = ({
  startDate,
}) => {
  const formatedDate = dayjs(formatDate(startDate))

  return (
    <Container className={classes.agended}>
      <Row className={classes.row}>
        <Col className={classes.date} xs={3} md={2}>
          <Lightbulb className={classes.date_icon} />
          <span className={classes.date_number}>
            {formatedDate.format('DD')}
          </span>
          <span className={classes.date_text}>
            {formatedDate.format('ddd')}
          </span>
        </Col>
        <Col className={classes.info} xs={7} md={8}>
          <strong className={classes.info_title}>Sesión de Coaching</strong>
          <span className={classes.info_desc}>
            {formatedDate.format('HH:MM')}
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
    </Container>
  )
}
