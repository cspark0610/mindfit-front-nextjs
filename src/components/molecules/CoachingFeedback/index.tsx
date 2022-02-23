//next components
import { useState } from 'react'

// bootstrap components
import { Button, Col, Modal, Row } from 'react-bootstrap'

// components
import { Ratings } from 'components/atoms/Rating'

// gql
import COACHING_FEEDBACK from 'lib/mutations/Feedback/CoachingFeedback.gql'

//styles
import classes from 'styles/CoachingFeedback/coachingFeedback.module.scss'

//types
import { FC } from 'react'
import { CheckSquare } from 'react-bootstrap-icons'
import { useMutation } from '@apollo/client'
import { microServices } from 'commons'

export const CoachingFeedback: FC = () => {
  const [showModal, setShowModal] = useState(true)
  const [showCheck, setShowCheck] = useState(false)

  const [coachingFeedback] = useMutation(COACHING_FEEDBACK, {
    onCompleted: () => setShowCheck(true),
    onError: (err) => console.log(err),
    context: { ms: microServices.backend },
  })

  const handleOpenCheck = () => {
    coachingFeedback({ variables: {} })
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
              <Ratings />
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
