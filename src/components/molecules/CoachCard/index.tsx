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
  data: CoachDataType
  content: any
}

export const CoachCard: FC<CoachCardProps> = ({ data, content }) => {
  const [showModal, setShowModal] = useState(false)

  const handleCloseModal = () => setShowModal(false)
  const handleOpenModal = () => setShowModal(true)

  return (
    <>
      <div className={classes.coachCard}>
        <Row>
          <Col xs={12} sm={4} className={classes.leftSide}>
            <Image
              src={data.picture}
              width={100}
              height={100}
              alt='coach photo'
            />
            <div className={classes.video}>
              <Image
                src={data.videoThumb}
                width={80}
                height={80}
                alt='video thumbnail'
              />
              <Youtube size={36} className={classes.video_icon} />
            </div>
          </Col>
          <Col className={classes.rightSide}>
            <div>
              <h4>{data.name}</h4>
              <p>{data.title}</p>
              <hr />
            </div>
            <p>{data.description}</p>
            <Button
              className={classes.button}
              onClick={() => handleOpenModal()}>
              {content?.sugestionButton.label}
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        contentClassName={classes.coachModal}
        show={showModal}
        onHide={handleCloseModal}
        size='lg'>
        <Modal.Body>
          <CoachPreviewCard
            coach={data}
            content={content}
            handleCloseModal={handleCloseModal}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
