//Next components
import Link from 'next/link'
//styles
import { Col, Container, Row } from 'react-bootstrap'
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'
//components
import { CoachCard } from 'components/molecules/CoachCard'
import { Layout } from 'components/organisms/Layout'

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
      <Container fluid className={classes.container}>
        <Row>
          <Col>
            <h3 className='text-center my-4'>Elige tu coach</h3>
          </Col>
        </Row>
        <Row>
          <Col
            lg={{ span: 10, offset: 1 }}
            className='d-flex flex-wrap justify-content-around'>
            {coachs.map((coach) => (
              <CoachCard
                data={coach}
                key={`coachCard-${Math.random() * 100 - 1}`}
              />
            ))}
          </Col>
        </Row>
        <Row>
          <Link href=''>
            <a className='text-center'>Explorar</a>
          </Link>
        </Row>
      </Container>
    </Layout>
  )
}

export default SelectCoach
