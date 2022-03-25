// main tools
import Image from 'next/image'
import dayjs from 'dayjs'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Lightbulb, Calendar2 } from 'react-bootstrap-icons'

// utils
import { formatDate } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import { FC } from 'react'
import Link from 'next/link'

type ScheduledAppointmentCardProps = {
  startDate: string
  preview?: boolean
  actions?: boolean
  role?: string
  coachingSession?: { id: number }
}

export const ScheduledAppointmentCard: FC<ScheduledAppointmentCardProps> = ({
  startDate,
  preview,
  actions,
  role,
  coachingSession,
}) => {
  const now = dayjs()
  const formatedDate = dayjs(formatDate(startDate))
  const isBefore = formatedDate.isBefore(now)
  const nearby = formatedDate.diff(now, 'minutes')

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
      <Row className='w-100 flex-row-reverse'>
        {preview && !isBefore && (
          <Col xs={7}>
            <Button className={classes.button}>Agregar al calendario</Button>
          </Col>
        )}
      </Row>
      <Row className='w-100'>
        {actions && nearby > 30 && (
          <>
            <Col xs={6}>
              <Button variant='primary' className={classes.button}>
                Posponer o eliminar cita
              </Button>
            </Col>
            <Col xs={6}>
              <Button variant='primary' className={classes.button}>
                <Calendar2 size={20} /> Agregar al calendario
              </Button>
            </Col>
          </>
        )}
        {/* change "< 0" to "> 0" */}
        {actions && nearby < 0 && nearby < 30 && (
          <Col xs={5}>
            <Link
              href={`/coaching-session/${role}/${coachingSession?.id}`}
              passHref>
              <Button variant='primary' className={classes.button}>
                Entra a tu cita ¡Ya es la hora!
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  )
}
