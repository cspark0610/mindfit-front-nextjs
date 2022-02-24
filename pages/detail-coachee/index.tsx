// main tools
import Link from 'next/link'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Sticky } from 'react-bootstrap-icons'

// components
import { Layout } from 'components/organisms/Layout'
import { CardNote } from 'components/atoms/CardNote'
import { CardHistory } from 'components/molecules/CardHistory'
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'

// styles
import classes from 'styles/DetailCoachee/detailCoachee.module.scss'

// types
import { NextPage } from 'next'

const DetailCoachee: NextPage = () => (
  <Layout>
    <Container>
      <Row className='mt-4'>
        <Col md={6} lg={3}>
          <Container className={classes.section}>
            <CoacheeProfileCard />
          </Container>
        </Col>
        <Col md={6}>
          <Container className={classes.section}>
            <Row>
              <h5 className={`mb-4 ${classes.title}`}>
                Resumen de la evaluación
              </h5>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea.
              </p>
            </Row>
            <Row md={2}>
              <Col className={classes.data}>
                <Link href='/'><a>Ver mas...</a></Link>
              </Col>
              <Col xs='auto'>
                <Button className={classes.button}>Realizar evaluación</Button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col md={12} lg={3}>
          <Container className={classes.section_notes}>
            <h5 className='mb-4'>
              <Sticky className={`me-2 ${classes.icon}`} />
              Notas
            </h5>
            {[0, 1, 2].map((item) => (
              <CardNote key={item} />
            ))}
          </Container>
        </Col>
      </Row>
      <Row className='mt-4 pb-4'>
        <h3 className={`mb-4 ${classes.title}`}>Historial</h3>
        {[0, 1, 2, 3].map((item) => (
          <Col xs={6} lg={3} key={item}>
            <CardHistory />
          </Col>
        ))}
      </Row>
    </Container>
  </Layout>
)

export default DetailCoachee
