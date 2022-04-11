//main tools
import { useState } from 'react'
import { useSession } from 'next-auth/react'

// bootstrap components
import { CheckSquare } from 'react-bootstrap-icons'
import { Button, Col, Modal, Row } from 'react-bootstrap'

// components
import { Ratings } from 'components/atoms/Rating'

// commoms
import { microServices } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import COACH_FEEDBACK from 'lib/mutations/Feedback/coachFeedback.gql'
import COACHEE_FEEDBACK from 'lib/mutations/Feedback/coacheeFeedback.gql'

//styles
import classes from 'styles/CoachingFeedback/coachingFeedback.module.scss'

//types
import { FC } from 'react'
import { FeedbackProps } from 'types/components/feedback'

export const CoachingFeedback: FC<{
  feedbackId: number
  coachingSessionId: number
}> = ({ coachingSessionId, feedbackId }) => {
  const { data } = useSession()
  const [showModal, setShowModal] = useState(true)
  const [showCheck, setShowCheck] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackProps[]>([])

  const [coachingFeedback] = useMutation(
    data?.user.coachee ? COACHEE_FEEDBACK : COACH_FEEDBACK,
    {
      context: { ms: microServices.backend },
      onCompleted: () => setShowCheck(true),
    }
  )

  const handleOpenCheck = () => {
    if (data?.user.coachee) {
      coachingFeedback({
        variables: {
          feedbackId: feedbackId,
          coacheeFeedback: feedback,
          coachingSessionId: coachingSessionId,
        },
      })
    } else {
      coachingFeedback({
        variables: {
          feedbackId: feedbackId,
          coachFeedback: feedback,
          coachingSessionId: coachingSessionId,
        },
      })
    }
    setShowModal(false)
  }

  return (
    <>
      <Modal
        centered
        contentClassName={classes.section}
        show={showModal}
        onHide={() => setShowModal(false)}
        size='lg'>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body>
          <Col lg={9} className={classes.body}>
            <h2>Valorar sesión del coaching</h2>
            <Row className={classes.rating}>
              <h4>¿Que tal te fue en la sesión?</h4>
              <p>Podrías ayudarnos a calificar audio y video </p>
              <Ratings
                feedback={feedback}
                feedbackId={feedbackId}
                setFeedback={setFeedback}
              />
            </Row>
            <Col md={4} className={classes.body_button}>
              <Button className={classes.button} onClick={handleOpenCheck}>
                Aceptar
              </Button>
            </Col>
          </Col>
        </Modal.Body>
      </Modal>
      <Modal
        centered
        contentClassName={classes.section}
        show={showCheck}
        onHide={() => setShowCheck(false)}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body>
          <h1>Gracias por tu feedback</h1>
          <CheckSquare className={classes.icon} />
        </Modal.Body>
      </Modal>
    </>
  )
}
