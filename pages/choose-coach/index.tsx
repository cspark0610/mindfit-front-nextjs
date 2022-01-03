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
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
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
              <CoachCard data={coach} key={idx} />
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
