// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'

//components
import { CoachCard } from 'components/molecules/CoachCard'
import { Layout } from 'components/organisms/Layout'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { CoachSearchFeedback } from 'components/molecules/CoachSearchFeedback'

//gql
import { useQuery } from '@apollo/client'
import LAUNCH_LIST from 'gql/queries/LaunchList.graphql'

//styles
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'

//types
import { NextPage } from 'next'
import { CoachDataType } from 'types/models/Coach'

const SelectCoach: NextPage = () => {
  //test gql query
  const { data } = useQuery(LAUNCH_LIST, {
    onCompleted: () => {
      console.log(data)
    },
  })
  //end test

  const coachs: CoachDataType[] = [
    {
      id: '0564654a',
      name: 'Camila Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654d',
      name: 'Juliana Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654w',
      name: 'Petra Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654k',
      name: 'Ana Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654p',
      name: 'Josefa Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654l',
      name: 'Andrea Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654m',
      name: 'Ada Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654b',
      name: 'Laura Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654y',
      name: 'Amanda Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
    {
      id: '0564654x',
      name: 'Cindy Garcia',
      title: 'Especialista en motivación',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit Eligendi rerum mollitia, id sit voluptas esse beatae.',
      picture: '/assets/images/avatar.png',
      videoThumb: '/assets/images/video.png',
      videoUrl: 'https:youtube.com',
    },
  ]
  //States
  const [showedCoachs, setShowedCoachs] = useState(2)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)

  //form state handlers
  const handleOpenFeedBackForm = () => setShowFeedbackForm(true)
  const handleCloseFeedBackForm = () => setShowFeedbackForm(false)

  const handleSubmit = () => {
    if (showedCoachs < 8) {
      setShowedCoachs(showedCoachs + 3)
      handleCloseFeedBackForm()
    }
  }

  return (
    <Layout>
      <Container className={classes.container}>
        {showFeedbackForm ? (
          <Row className='justify-content-center'>
            <Col md={9}>
              <CoachSearchFeedback
                submit={handleSubmit}
                cancel={handleCloseFeedBackForm}
              />
            </Col>
          </Row>
        ) : (
          <>
            <h1 className={classes.title}>Elige tu coach</h1>
            <Row className='justify-content-center'>
              <Col xs={12} md={9}>
                <Row>
                  {coachs.map(
                    (coach, idx) =>
                      idx <= showedCoachs && (
                        <Col className='mb-4' xs={12} md={6} key={coach.id}>
                          <CoachCard data={coach} />
                        </Col>
                      )
                  )}
                </Row>
              </Col>
            </Row>
            <Row>
              {showedCoachs < 8 && (
                <Button
                  variant='link'
                  className={classes.sugestBtn}
                  onClick={handleOpenFeedBackForm}>
                  Sugerir otros coaches
                </Button>
              )}
            </Row>
            <ExploreBadge />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default SelectCoach
