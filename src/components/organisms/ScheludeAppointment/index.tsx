// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ChevronRight } from 'react-bootstrap-icons'

// components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// styles
import classes from 'styles/Schedule/schedule.module.scss'

// types
import { FC } from 'react'

export const ScheduleAppointment: FC = () => {
  return (
    <Container className={classes.section}>
      <Row className={classes.section_body}>
        <h3 className={`mb-5 text-center fw-bold ${classes.title}`}>
          ¿Cuando deseas conocer a tu coach?
        </h3>
        <Row className={`mb-5 ${classes.row}`}>
          {[1, 2, 3, 4].map((item) => (
            <Col xs={12} md='auto' key={item}>
              <Button
                className={`mb-3 ${classes.section_card}`}
                variant='secondary'>
                <h4 className={`fw-bold ${classes.day}`}>25 Nov</h4>
                <h4 className='fw-bold'>Jue</h4>
              </Button>
            </Col>
          ))}
        </Row>
        <h4 className={`mb-5 ${classes.title}`}>Selecciona la hora</h4>
        <Row>
          {[1, 2].map((item) => (
            <Button
              className={`mb-3 ${classes.section_card}`}
              variant='secondary'>
              <Row xs={1} key={item} className={classes.hour}>
                <Col xs={5}>
                  <p>Desde</p>
                  <h2 className='fw-bold'>12:00 pm</h2>
                </Col>
                <Col>
                  <ChevronRight
                    width={32}
                    height={32}
                    className={classes.icon}
                  />
                </Col>
                <Col xs={5}>
                  <p>Hasta</p>
                  <h2 className='fw-bold'>02:00 pm</h2>
                </Col>
              </Row>
            </Button>
          ))}
        </Row>
        <Row xs='auto' className={`mt-5 ${classes.section_button}`}>
          <Col xs='auto' md={4}>
            <Button className={classes.button}>Aceptar</Button>
          </Col>
        </Row>
      </Row>
      <ExploreBadge />
    </Container>
  )
}
