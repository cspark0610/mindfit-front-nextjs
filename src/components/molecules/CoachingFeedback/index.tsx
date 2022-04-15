//main tools
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

// bootstrap components
import { CheckSquare } from 'react-bootstrap-icons'
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap'

// components
import { Ratings } from 'components/atoms/Rating'
import { CoachingFeedbackSkeleton } from './Skeleton'

// commoms
import { microServices } from 'commons'
import { userRoles } from 'utils/enums'

// gql
import { useMutation, useQuery } from '@apollo/client'
import GET_CONTENT from 'lib/strapi/queries/coaching/feedbackContent.gql'
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
  const { locale } = useRouter()
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(true)
  const [showCheck, setShowCheck] = useState(false)
  const [feedback, setFeedback] = useState<FeedbackProps[]>([])

  const { loading: contentLoading, data: contentFeedback } = useQuery(
    GET_CONTENT,
    {
      variables: { locale },
      context: { ms: microServices.strapi },
    }
  )
  const content = contentFeedback.coachingFeedback.data.attributes

  const [coachingFeedback] = useMutation(
    data?.user.coachee ? COACHEE_FEEDBACK : COACH_FEEDBACK,
    {
      context: { ms: microServices.backend },
      onCompleted: () => setShowCheck(true),
    }
  )

  const handleOpenCheck = async () => {
    setLoading(true)
    await coachingFeedback({
      variables: {
        feedbackId,
        coachingSessionId,
        ...(data?.user.role === userRoles.COACHEE
          ? { coacheeFeedback: feedback }
          : { coachFeedback: feedback }),
      },
    })

    setLoading(false)
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
            {contentLoading ? (
              <CoachingFeedbackSkeleton />
            ) : (
              <>
                <h2>{content.title}</h2>
                <Row className={classes.rating}>
                  <h4>{content.subtitle}</h4>
                  <Ratings
                    feedback={feedback}
                    feedbackId={feedbackId}
                    setFeedback={setFeedback}
                  />
                </Row>
                <Col md={4} className={classes.body_button}>
                  <Button className={classes.button} onClick={handleOpenCheck}>
                    {loading ? (
                      <Spinner animation='border' />
                    ) : (
                      content.sendButton.label
                    )}
                  </Button>
                </Col>
              </>
            )}
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
          <h1>{content.gratitudeMessage}</h1>
          <CheckSquare className={classes.icon} />
        </Modal.Body>
      </Modal>
    </>
  )
}
