import { FC } from 'react'
import Image from 'next/image'
import classes from 'styles/UI/Modal/appModal.module.scss'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { CoachDataType } from 'types/components/CoachCard'
import { Container, Row, Col, Button, ModalBody } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { ChevronLeft } from 'react-bootstrap-icons'

interface modalCoachInterface {
  selectedCoach: CoachDataType
  showModal: boolean
  closeModal: VoidFunction
}

export const CoachModal: FC<modalCoachInterface> = ({
  selectedCoach,
  showModal = false,
  closeModal,
}) => {
  const {
    picture: imageProfile,
    name,
    title: occupation,
    description,
    videoUrl,
  } = selectedCoach
  return (
    <>
      {!!showModal && (
        <Modal
          show={showModal}
          onHide={closeModal}
          contentClassName={classes.ModalContainer}>
          <ModalBody className={classes.body}>
            <div className={classes.backButtonContainer}>
              <Button className={classes.backButton} onClick={closeModal}>
                <ChevronLeft width={32} height={32} />
              </Button>
            </div>
            <Container>
              <Row className='text-center mb-4'>
                <Col>
                  <div>
                    <Image
                      src={imageProfile}
                      alt='User profile picture'
                      width={150}
                      height={150}
                      layout='intrinsic'
                      className={classes.images}
                    />
                  </div>
                  <h2 className={`${classes.coach_data} fw-bold`}>{name}</h2>
                  <p className={`${classes.coach_data} fw-normal`}>
                    {occupation}
                  </p>
                </Col>
              </Row>
              <Row className='mb-5'>
                <Col>
                  <p className={`mb-4 ${classes.coach_description}`}>
                    {description}
                  </p>
                  <div className='text-end'>
                    <Button className={classes.button}>Ver Mas..</Button>
                  </div>
                </Col>
              </Row>
              <Row className='mb-5'>
                <video src={videoUrl} controls />
              </Row>
              <Row className='d-flex justify-content-end'>
                <Col>
                  <Button className={classes.button}>Seleccionar</Button>
                </Col>
              </Row>
              <Row>
                <ExploreBadge />
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      )}
    </>
  )
}
