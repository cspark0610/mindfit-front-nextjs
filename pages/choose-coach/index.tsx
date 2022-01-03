//Next components
import Link from 'next/link'
//styles
import { Col, Container, Row } from 'react-bootstrap'
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'
//components
import { CoachCard } from 'components/molecules/CoachCard'
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

function SelectCoach() {
  const coachs = [
    {
      id: '0564654a',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654d',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654w',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654k',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654p',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654l',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654m',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654b',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654y',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654x',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
  ]
  return (
    <Layout>
      <Container className={classes.container}>
        <Row>
          <Col>
            <h3 className={classes.viewTitle}>Elige tu coach</h3>
          </Col>
        </Row>
        <Row className={classes.coachsContainer}>
          {coachs.map((coach, idx) => (
            <Col xs={12} md={8} lg={5}>
              <CoachCard data={coach} key={coach.id} />
            </Col>
          ))}
        </Row>
        <Row>
          <ExploreBadge />
        </Row>
      </Container>
    </Layout>
  )
}

export default SelectCoach
