// main tools
import Image from 'next/image'
import { useRouter } from 'next/router'

// components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// gql
import { useMutation } from '@apollo/client'
import SELECT_COACH from 'lib/mutations/Coachees/selectCoach.gql'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ChevronLeft } from 'react-bootstrap-icons'

// utils
import { microServices } from 'commons'

// styles
import classes from 'styles/CoachPreviewCard/card.module.scss'

// types
import { FC } from 'react'
import { CoachDataType } from 'types/models/Coach'

interface modalCoachInterface {
  handleCloseModal?: () => void
  suggestedCoachId: number
  coach: CoachDataType
  content: any
}

export const CoachPreviewCard: FC<modalCoachInterface> = ({
  coach,
  content,
  suggestedCoachId,
  handleCloseModal,
}) => {
  const { push } = useRouter()

  const [SelectCoach] = useMutation(SELECT_COACH, {
    context: { ms: microServices.backend },
    variables: { data: { suggestedCoachId, coachId: coach.id } },
    onCompleted: () => push('/user'),
  })

  const handleSelectCoach = () => SelectCoach()

  return (
    <Container className={classes.section}>
      <div className={classes.container}>
        {handleCloseModal && (
          <Button className={classes.close} onClick={handleCloseModal}>
            <ChevronLeft width={32} height={32} />
          </Button>
        )}
        <Row className='justify-content-end mb-4'>
          <Col className='text-center' xs={12}>
            <div>
              <Image
                width={150}
                height={150}
                layout='intrinsic'
                alt='User profile picture'
                className={classes.images}
                src='/assets/images/avatar.png'
              />
            </div>
            <h2 className={classes.name}>{coach.user?.name}</h2>
            {/* <p className={classes.position}>{coach.title}</p> */}
            <p className={classes.description}>{coach.bio}</p>
          </Col>
          <Col xs={3} className='ml-auto'>
            <Button className={classes.button} variant='secondary'>
              {content?.moreInfoButton.label}
            </Button>
          </Col>
        </Row>
        <Row className='mb-5'>
          <video src={coach.videoPresentation} controls />
        </Row>
        <Row className='d-flex justify-content-end'>
          <Col xs={3}>
            <Button onClick={handleSelectCoach} className={classes.button}>
              {content?.nextButton.label}
            </Button>
          </Col>
        </Row>
      </div>
      <ExploreBadge />
    </Container>
  )
}
