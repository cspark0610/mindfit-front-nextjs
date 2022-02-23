// main tools
import Link from 'next/link'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { StarFill, Sticky } from 'react-bootstrap-icons'

// components
import { Layout } from 'components/organisms/Layout'
import { CardNote } from 'components/atoms/CardNote'
import { SumaryResult } from 'components/atoms/SumaryResult'
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'

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
            <CoacheeProfileCard />
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
              <Row md='auto' className={classes.buttons}>
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
                <CardNote key={idx} />
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
