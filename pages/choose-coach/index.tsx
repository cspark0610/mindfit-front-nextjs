import { useState } from 'react'
//styles
import { Button, Col, Container, Row } from 'react-bootstrap'
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'
//components
import { CoachCard } from 'components/molecules/CoachCard'
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { Modal } from 'components/molecules/Modal'
import { CoachSearchFeedback } from 'components/molecules/CoachSearchFeedback'
//types
import { CoachDataType } from 'types/components/CoachCard'

function SelectCoach() {
  //temporally data
  const coachs: Array<CoachDataType> = [
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
      name: 'Juliana Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654w',
      name: 'Petra Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654k',
      name: 'Ana Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654p',
      name: 'Josefa Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654l',
      name: 'Andrea Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654m',
      name: 'Ada Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654b',
      name: 'Laura Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654y',
      name: 'Amanda Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654x',
      name: 'Cindy Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/static/images/avatar.png',
      videoThumb: '/static/images/video.png',
      videoUrl: 'https:youtube.com',
    },
  ]
  const [selectedCoach, setSelectedCoach] = useState<CoachDataType>({
    id: '',
    name: '',
    title: '',
    description: '',
    picture: '',
    videoThumb: '',
    videoUrl: '',
  })
  //States
  const [showModal, setShowModal] = useState(false)
  const [showedCoachs, setShowedCoachs] = useState(2)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  //Modal State Handlers
  const closeModal = () => setShowModal(false)

  const openModal = (id: string) => {
    setSelectedCoach(coachs.filter((coach) => coach.id === id)[0])
    setShowModal(true)
  }
  //form state handlers
  const handleShowMoreCoaches = () => setShowFeedbackForm(true)

  const handleCloseFeedBackForm = (e: any) => {
    setShowFeedbackForm(false)
    if (e.target.value === 'Enviar' && showedCoachs < 8)
      setShowedCoachs(showedCoachs + 3)
  }

  return (
    <Layout>
      <Container className={classes.container}>
        <Row>
          <Col>
            <h3 className={classes.viewTitle}>Elige tu coach</h3>
          </Col>
        </Row>
        <Row className={classes.coachsContainer}>
          {coachs.map((coach, index) => {
            if (index <= showedCoachs) {
              return (
                <Col xs={12} md={8} lg={5} key={coach.id}>
                  <CoachCard data={coach} openModal={openModal} />
                </Col>
              )
            }
          })}
        </Row>
        <Row>
          {showedCoachs < 8 && (
            <Button
              variant='link'
              className={classes.sugestBtn}
              onClick={handleShowMoreCoaches}>
              Sugerir otros coaches
            </Button>
          )}
          <ExploreBadge />
        </Row>
        <Modal
          selectedCoach={selectedCoach}
          showModal={showModal}
          closeModal={closeModal}
        />
        {showFeedbackForm && (
          <CoachSearchFeedback handleCloseForm={handleCloseFeedBackForm} />
        )}
      </Container>
    </Layout>
  )
}

export default SelectCoach
