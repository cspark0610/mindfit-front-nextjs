// main tools
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ChevronDoubleRight } from 'react-bootstrap-icons'

// components
import { Layout } from 'components/organisms/Layout'

// styles
import classes from 'styles/CoacheeSession/coacheeSession.module.scss'

// types
import { NextPage } from 'next'

const CoacheeSession: NextPage = () => (
  <Layout>
    <Container>
      <Row className={classes.container}>
        <Col lg={6}>
          <Container className={classes.section}>
            <Image
              className={classes.avatar}
              src='/assets/images/avatar.png'
              width={150}
              height={150}
              alt='user avatar'
            />
            <h2 className={classes.title}>Katherine Smith</h2>
            <h4 className={classes.subtitle}>Especialista en Motivación</h4>
            <h5>Otras especializaciones</h5>
            {[0, 1, 2, 3].map((item, idx) => (
              <h6 key={idx}>
                <ChevronDoubleRight className={classes.icon} />
                Desarrollo de Liderazgo
              </h6>
            ))}
            <p className={classes.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea.
            </p>
            <p className={classes.paragraph}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea.
            </p>
            <Row className={classes.row}>
              <Button className={classes.button}>Ver más</Button>
            </Row>
            <Row className={classes.video}>
              <Image
                src='/assets/images/video.png'
                width={500}
                height={300}
                alt='video thumbnail'
              />
            </Row>
          </Container>
        </Col>
        <Col lg={6}>
          <Container className={classes.section}>
            <h1>chat</h1>
          </Container>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default CoacheeSession
