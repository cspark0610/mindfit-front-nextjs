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
import { Layout } from 'components/organisms/Layout'
import { Note } from 'components/atoms/Note'
import { SumaryResult } from 'components/atoms/SumaryResult'

// styles
import classes from 'styles/CoachSession/coachSession.module.scss'

// types
import { NextPage } from 'next'

const CoachSession: NextPage = () => (
  <Layout>
    <Container>
      <Row className={classes.container}>
        <Col md={6} lg={3}>
          <Container className={classes.section}>
            <Row className={classes.row}>
              <Image
                className={classes.avatar}
                src='/assets/images/avatar.png'
                width={100}
                height={100}
                alt='user avatar'
              />
              <h5 className={classes.button}>Nestor García</h5>
              <h5>Perfil segun SAT</h5>
              <Row>
                {[0, 1, 2, 3].map((item, idx) => (
                  <Row xs='auto' key={idx} className={classes.results}>
                    <EmojiSmile className={classes.icon} />
                    <p>Motivación 10/10</p>
                  </Row>
                ))}
              </Row>
              <Row>
                {[0, 1, 2].map((item, idx) => (
                  <Row xs='auto' key={idx} className={classes.profile}>
                    <Diagram2 className={classes.icon} />
                    <h6>Organización</h6>
                    <p>Company Minfit</p>
                  </Row>
                ))}
              </Row>
              <Col xs={5} className={classes.section_small}>
                <CalendarCheck className={classes.icon} />
                <p>
                  10/11/21 <br /> 10:00 AM
                </p>
              </Col>
              <Col xs={5} className={classes.section_small}>
                <ChatLeft className={classes.icon} />
                <p>Chat</p>
              </Col>
            </Row>
          </Container>
          <Container className={classes.section}>
            <Row className={classes.row}>
              <h5 className={classes.title}>
                <StarFill className={classes.icon} />
                Evolución: Nestor García
              </h5>
              <p className={classes.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea.
              </p>
              <Row md='auto' className={classes.buttons} >
                <Link href='/'>Ver mas...</Link>
                <Button size={'sm'}>Realizar evaluación</Button>
              </Row>
            </Row>
          </Container>
        </Col>
        <Col md={6}>
          <Container className={classes.section}>
            <h1>chat</h1>
          </Container>
        </Col>
        <Col md={12} lg={3}>
          <Container className={classes.section}>
            <Row className={classes.row}>
              <h5 className={classes.title}>
                <Sticky className={classes.icon} />
                Notas
              </h5>
              {[0, 1, 2].map((item, idx) => (
                <Note key={idx} />
              ))}
            </Row>
          </Container>
          <Container className={classes.section}>
            <Row className={classes.row}>
              <h5 className={classes.title_blue}>Resultados Resumen</h5>
              <p className={classes.paragraph}>
                Gracias a los datos que has aportado en el cuestionario, vas a
                poder descubrir aspectos sobre tu entorno emocional, y sobre
                todo de tu “yo” personal y profesional, aspectos que quizá no
                conocías.
              </p>
              {[0, 1].map((item, idx) => (
                <SumaryResult key={idx} />
              ))}
              <Link href='/'>Ver mas...</Link>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default CoachSession
