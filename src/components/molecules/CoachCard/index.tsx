//next components
import { useState } from 'react'
import Image from 'next/image'

// bootstrap components
import { Button, Col, Row, Modal } from 'react-bootstrap'
import { Youtube } from 'react-bootstrap-icons'

// components
import { CoachPreviewCard } from 'components/molecules/CoachPreviewCard'

//styles
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'

//types
import { FC } from 'react'
import { CoachDataType } from 'types/models/Coach'

interface CoachCardProps {
  suggestedCoachId: number
  data: CoachDataType
  content: any
}

export const CoachCard: FC<CoachCardProps> = ({
  data,
  suggestedCoachId,
  content,
}) => {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleOpenModal = () => setShowModal(true)

  return (
    <>
      <div className={classes.coachCard}>
        <Row>
          <Col xs={12} sm={4} className={classes.leftSide}>
            <Image
              width={100}
              height={100}
              alt='coach photo'
              src='/assets/images/avatar.png'
            />
            <div className={classes.video}>
              <Image
                width={80}
                height={80}
                alt='video thumbnail'
                src='/assets/images/video.png'
              />
              <Youtube size={36} className={classes.video_icon} />
            </div>
          </Col>
          <Col className={classes.rightSide}>
            <div>
              <h4>{data.user?.name}</h4>
              {/* <p>{data.bio}</p> */}
              <hr />
            </div>
            <p>{data.bio}</p>
            <Button
              variant='secondary'
              className={classes.button}
              onClick={() => handleOpenModal()}>
              {content?.sugestionButton.label}
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        size='lg'
        show={showModal}
        onHide={handleCloseModal}
        contentClassName={classes.coachModal}>
        <Modal.Body>
          <CoachPreviewCard
            coach={data}
            content={content}
            suggestedCoachId={suggestedCoachId}
            handleCloseModal={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
