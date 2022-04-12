//next components
import { useState } from 'react'
import Image from 'next/image'

// bootstrap components
import { Button, Col, Row, Modal } from 'react-bootstrap'

// components
import { ChooseCoachPreview } from 'components/organisms/ChooseCoach/ChooseCoachPreview'

//styles
import classes from 'styles/ChooseCoach/page.module.scss'

//types
import { CoachDataType } from 'types/models/Coach'
import { fileDataType } from 'types/models/Files'
import { FC } from 'react'

type ChooseCoachCardProps = {
  suggestedCoachId: number
  data: CoachDataType
  content: any
}

export const ChooseCoachCard: FC<ChooseCoachCardProps> = ({
  data,
  content,
  suggestedCoachId,
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
              className='rounded-circle'
              src={(data.profilePicture as fileDataType).location}
            />
          </Col>
          <Col className={classes.rightSide}>
            <div>
              <h4>{data.user?.name}</h4>
              <hr />
            </div>
            <p>{data.bio}</p>
            <Button
              variant='secondary'
              className={classes.button}
              onClick={() => handleOpenModal()}>
              {content?.moreInfoButton.label}
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
          <ChooseCoachPreview
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
