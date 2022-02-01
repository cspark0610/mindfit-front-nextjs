// main tools
import Link from 'next/link'
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import {
  CalendarCheck,
  ChatLeft,
  Diagram2,
  EmojiSmile,
  StarFill,
  Sticky,
} from 'react-bootstrap-icons'

// components
import { Note } from 'components/atoms/Note'
import { SumaryResult } from 'components/atoms/SumaryResult'

// styles
import classes from 'styles/CoachingSession/coachingSession.module.scss'

// types
import { NextPage } from 'next'

const CoachingSession: NextPage = () => (
  <Container>
    <Row>
      <Col md={3}>
        <Row className={classes.section}>
          <Image
            className={classes.avatar}
            src='/assets/images/avatar.png'
            width={100}
            height={100}
            alt='user avatar'
          />
          <p className={classes.button}>Nestor García</p>
          <h5>Perfil segun SAT</h5>
          <Row className={classes.results}>
            <p>
              <EmojiSmile className={classes.icon} />
              Motivación 10/10
            </p>
            <p>
              <EmojiSmile className={classes.icon} />
              Motivación 10/10
            </p>
            <p>
              <EmojiSmile className={classes.icon} />
              Motivación 10/10
            </p>
            <p>
              <EmojiSmile className={classes.icon} />
              Motivación 10/10
            </p>
          </Row>
          <Row className={classes.profile}>
            <span>
              <Diagram2 className={classes.icon} />
              Organización
            </span>
            <p>Company Minfit</p>
            <span>
              <Diagram2 className={classes.icon} />
              Organización
            </span>
            <p>Company Minfit</p>
            <span>
              <Diagram2 className={classes.icon} />
              Organización
            </span>
            <p>Company Minfit</p>
          </Row>
          <Col xs={5} md={12} lg={5} className={classes.section}>
            <CalendarCheck className={classes.icon} />
            10/11/21 <br /> 10:00 AM
          </Col>
          <Col xs={5} md={12} lg={5} className={classes.section}>
            <ChatLeft className={classes.icon} />
            Chat
          </Col>
        </Row>
        <Row className={classes.section}>
          <h5>
            <StarFill className={classes.icon} />
            Evolución: Nestor García
          </h5>
          <p className={classes.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea.
          </p>
          <Col xs={5} md={12} lg={5}>
            <Link href='/'>Ver mas...</Link>
          </Col>
          <Col xs={5} md={12} lg={7}>
            <Button className='p-button-sm'>Realizar evaluación</Button>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <Row>
          <h1>chat</h1>
        </Row>
      </Col>
      <Col md={3}>
        <Row className={classes.section}>
          <h5>
            <Sticky className={classes.icon} />
            Notas
          </h5>
          {[0, 1, 2].map((item, idx) => (
            <Note key={idx} />
          ))}
        </Row>
        <Row className={classes.section}>
          <h5 className={classes.title_blue}>Resultados Resumen</h5>
          <p className={classes.paragraph}>
            Gracias a los datos que has aportado en el cuestionario, vas a poder
            descubrir aspectos sobre tu entorno emocional, y sobre todo de tu
            “yo” personal y profesional, aspectos que quizá no conocías.
          </p>
          {[0, 1].map((item, idx) => (
            <SumaryResult key={idx} />
          ))}
          <Link href='/'>Ver mas...</Link>
        </Row>
      </Col>
    </Row>
  </Container>
)

export default CoachingSession
