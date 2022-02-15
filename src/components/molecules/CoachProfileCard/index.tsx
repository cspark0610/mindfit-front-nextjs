// Main tools
import { useState } from 'react'
import Image from 'next/image'

// components
import { ChatSession } from 'components/organisms/chatSession'

// Bootstrap components
import { Container, Button, Modal } from 'react-bootstrap'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Styles
import classes from 'styles/CoachProfileCard/coachProfileCard.module.scss'

export const CoachProfileCard = () => {
  const [showChat, setShowChat] = useState(false)
  return (
    <>
      <Container className={classes.section}>
        <div className='text-center mb-4'>
          <Image
            src='/assets/images/avatar.png'
            alt='avatar'
            width={182}
            height={182}
            layout='intrinsic'
            className={classes.images}
          />
        </div>
        <div className={`text-center mb-4 ${classes.description_container}`}>
          <h3 className='fs-5 fw-bold'>Katherine Smit</h3>
          <p className='fs-6 mb-0'>
            Licenciada en Sociología e investigadora del desarrollo humano por
            vocacion y pasión.
          </p>
        </div>
        <div className={`text-center mb-5 ${classes.specialization_container}`}>
          <h3 className='fs-5 fw-bold'>Especializacion del Coach</h3>
          <ul>
            <li className={`fs-5 ${classes.especialization_skill}`}>
              Desarrollo de Liderazgo
            </li>
            <li className={`fs-5 ${classes.especialization_skill}`}>
              Psiología Positiva
            </li>
            <li className={`fs-5 ${classes.especialization_skill}`}>
              Desarrollo de liderazgo
            </li>
            <li className={`fs-5 ${classes.especialization_skill}`}>
              Psicologí Positiva
            </li>
          </ul>
        </div>
        <div className='mb-5 d-flex justify-content-around'>
          <Button className={classes.button}>
            <i className={PrimeIcons.CALENDAR} />
            <p className='fs-6'>10/11/21 10:00 AM</p>
          </Button>
          <Button onClick={() => setShowChat(true)} className={classes.button}>
            <i className={PrimeIcons.COMMENTS} />
            <p className='fs-6'>CHAT</p>
          </Button>
        </div>
      </Container>
      <Modal
        centered
        show={showChat}
        className={classes.modal}
        onHide={() => setShowChat(false)}>
        <Modal.Body>
          <ChatSession />
        </Modal.Body>
      </Modal>
    </>
  )
}
