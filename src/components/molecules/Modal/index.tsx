import { FC } from 'react'
import classes from 'styles/UI/Modal/appModal.module.scss'
import { CoachContentModal } from 'components/molecules/CoachContentModal'
import { CoachDataType } from 'types/components/CoachCard'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ChevronLeft } from 'react-bootstrap-icons'

interface modalCoachInterface {
  selectedCoach: CoachDataType
  showModal: boolean
  closeModal: VoidFunction
}

export const Modal: FC<modalCoachInterface> = ({
  selectedCoach,
  showModal = false,
  closeModal,
}) => {
  const handleCloseModal = () => {
    closeModal()
  }
  return (
    <>
      {!!showModal && (
        <div className={classes.modalOverlay}>
          <Container className={classes.modalContainer}>
            <Row className={classes.body}>
              <Col className={classes.column}>
                <div className={classes.backButtonContainer}>
                  <Button
                    className={classes.backButton}
                    onClick={handleCloseModal}>
                    <ChevronLeft width={32} height={32} />
                  </Button>
                </div>
                <CoachContentModal
                  imageProfile={selectedCoach.picture}
                  name={selectedCoach.name}
                  occupation={selectedCoach.title}
                  description={selectedCoach.description}
                  urlVideo={selectedCoach.videoUrl}
                />
              </Col>
            </Row>
            <Row>
              <ExploreBadge />
            </Row>
          </Container>
        </div>
      )}
    </>
  )
}
