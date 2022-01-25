// main tools
import Image from 'next/image'

// components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ChevronLeft } from 'react-bootstrap-icons'

// styles
import classes from 'styles/CoachPreviewCard/card.module.scss'

// types
import { FC } from 'react'
import { CoachDataType } from 'types/models/Coach'

interface modalCoachInterface {
  coach: CoachDataType
  handleCloseModal?: () => void
  content: any
}

export const CoachPreviewCard: FC<modalCoachInterface> = ({
  coach,
  content,
  handleCloseModal,
}) => (
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
              src={coach.picture || '/#'}
              alt='User profile picture'
              width={150}
              height={150}
              layout='intrinsic'
              className={classes.images}
            />
          </div>
          <h2 className={classes.name}>{coach.name}</h2>
          <p className={classes.position}>{coach.title}</p>
          <p className={classes.description}>{coach.description}</p>
        </Col>
        <Col xs={3} className='ml-auto'>
          <Button className={classes.button}>
            {content?.moreInfoButton.label}
          </Button>
        </Col>
      </Row>
      <Row className='mb-5'>
        <video src={coach.videoUrl} controls />
      </Row>
      <Row className='d-flex justify-content-end'>
        <Col xs={3}>
          <Button className={classes.button}>
            {content?.nextButton.label}
          </Button>
        </Col>
      </Row>
    </div>
    <ExploreBadge />
  </Container>
)
