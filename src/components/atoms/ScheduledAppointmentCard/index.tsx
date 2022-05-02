// main tools
import Image from 'next/image'
import dayjs from 'dayjs'

// components
import { CalendarSchedule } from './calendarSchedule'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Lightbulb } from 'react-bootstrap-icons'

// utils
import { formatDate } from 'commons'

// styles
import classes from 'styles/agenda/page.module.scss'

// types
import Link from 'next/link'
import { FC } from 'react'

type ScheduledAppointmentCardProps = {
  content: any
  startDate: string
  preview?: boolean
  actions?: boolean
  role?: string
  coachingSession?: { id: number }
}

export const ScheduledAppointmentCard: FC<ScheduledAppointmentCardProps> = ({
  content,
  startDate,
  preview,
  actions,
  role,
  coachingSession,
}) => {
  const formatedDate = dayjs(formatDate(startDate))
  const isBefore = formatedDate.isBefore(dayjs())
  const nearby = formatedDate.diff(dayjs(), 'minutes')

  return (
    <Container className={classes.agended}>
      <Row className={classes.row}>
        <Col className={classes.date} xs={3}>
          <Lightbulb className={classes.date_icon} />
          <span className={classes.date_number}>
            {formatedDate.format('DD/MM')}
          </span>
          <span className={classes.date_text}>
            {formatedDate.format('ddd')}
          </span>
        </Col>
        <Col className={classes.info} xs={7}>
          <strong className={classes.info_title}>{content.title}</strong>
          <span className={classes.info_desc}>
            {formatedDate.format('HH:MM')}
          </span>
        </Col>
        <Col xs={2}>
          <Image
            width={50}
            height={50}
            alt='user avatar'
            className={classes.avatar}
            src='/assets/images/avatar.png'
          />
        </Col>
      </Row>
      <Row className='w-100 flex-row-reverse'>
        {preview && !isBefore && (
          <Col xs='auto'>
            <CalendarSchedule content={content} />
          </Col>
        )}
      </Row>
      <Row className='w-100'>
        {actions && nearby > 30 && (
          <>
            {role !== 'coach' && (
              <Col xs={6}>
                <Button variant='primary' className={classes.button}>
                  {content.offRemoveButton.label}
                </Button>
              </Col>
            )}
            <Col xs={6}>
              <CalendarSchedule content={content} />
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
                {content.getInButton.label}
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  )
}
