// main tools
import Image from 'next/image'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'
import {
  ChevronDoubleRight,
  Diagram2,
  CalendarEvent,
  Send,
} from 'react-bootstrap-icons'

import classes from 'styles/coachDashboard/page.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'

export const AllCoachees: FC = () => {
  const coachees: CoacheeDataType[] = [
    {
      id: 0,
      profilePicture: '/assets/images/avatar.png',
      user: { name: 'Nestor García' },
      coachingAreas: [
        { name: 'Liderazgo', value: 10, base: 10 },
        { name: 'Disciplina', value: 5, base: 10 },
        { name: 'Motivación', value: 8, base: 10 },
        { name: 'Comunicación', value: 3, base: 10 },
      ],
      organization: { name: 'Company Mindfit' },
    },
    {
      id: 1,
      profilePicture: '/assets/images/avatar.png',
      user: { name: 'Nestor García' },
      coachingAreas: [
        { name: 'Liderazgo', value: 10, base: 10 },
        { name: 'Disciplina', value: 5, base: 10 },
        { name: 'Motivación', value: 8, base: 10 },
        { name: 'Comunicación', value: 3, base: 10 },
      ],
      organization: { name: 'Company Mindfit' },
    },
    {
      id: 2,
      profilePicture: '/assets/images/avatar.png',
      user: { name: 'Nestor García' },
      coachingAreas: [
        { name: 'Liderazgo', value: 10, base: 10 },
        { name: 'Disciplina', value: 5, base: 10 },
        { name: 'Motivación', value: 8, base: 10 },
        { name: 'Comunicación', value: 3, base: 10 },
      ],
      organization: { name: 'Company Mindfit' },
    },
    {
      id: 3,
      profilePicture: '/assets/images/avatar.png',
      user: { name: 'Nestor García' },
      coachingAreas: [
        { name: 'Liderazgo', value: 10, base: 10 },
        { name: 'Disciplina', value: 5, base: 10 },
        { name: 'Motivación', value: 8, base: 10 },
        { name: 'Comunicación', value: 3, base: 10 },
      ],
      organization: { name: 'Company Mindfit' },
    },
  ]

  return (
    <>
      {coachees.map((coachee) => (
        <Col key={coachee.id} md={6} lg={4} xl={3}>
          <div className={classes.section}>
            <Image
              width={100}
              height={100}
              alt='user avatar'
              src='/assets/images/avatar.png'
            />
            <p className={classes.name}>{coachee.user?.name}</p>
            <p className='fw-bold'>Perfil según SAT</p>
            <Row className='justify-content-center'>
              <Col xs={9}>
                {coachee.coachingAreas?.map((area) => (
                  <div className={classes.coachingArea} key={area.name}>
                    <p>
                      <ChevronDoubleRight /> {area.name}
                    </p>
                    <small>
                      {area.value}/{area.base}
                    </small>
                  </div>
                ))}
              </Col>
            </Row>
            <Row className='my-3'>
              {coachee.organization && (
                <Col xs={12} className={classes.info}>
                  <Diagram2 /> <span>Organización</span>
                  <p>{coachee.organization.name}</p>
                </Col>
              )}
              <Col xs={12} className={classes.info}>
                <CalendarEvent /> <span>Fecha de registro</span>
                <p>5/12/2021</p>
              </Col>
              <Col xs={12} className={classes.info}>
                <CalendarEvent /> <span>Coachee desde</span>
                <p>5/01/2022</p>
              </Col>
            </Row>
            <Row className='justify-content-center'>
              <Col xs={5}>
                <Button className={classes.button}>
                  <CalendarEvent />
                  <p>10/11/21</p>
                </Button>
              </Col>
              <Col xs={5}>
                <Button className={classes.button}>
                  <Send />
                  <p>Bandeja</p>
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      ))}
    </>
  )
}
