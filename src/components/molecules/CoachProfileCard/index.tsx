// Main tools
import { useState } from 'react'
import Image from 'next/image'

// gql
import { useQuery } from '@apollo/client'
import GET_COACH_BY_ID from 'lib/queries/Coach/getById.gql'

// utils
import { microServices } from 'commons'

// components
import { CoachProfileCardSkeleton } from 'components/atoms/CoachProfileCardSkeleton'
import { ChatSession } from 'components/organisms/chatSession'

// Bootstrap components
import { Container, Button, Modal } from 'react-bootstrap'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Styles
import classes from 'styles/CoachProfileCard/coachProfileCard.module.scss'

// types
import { FC } from 'react'
import { CoachDataType } from 'types/models/Coach'

export const CoachProfileCard: FC<{ coachId: number | null }> = ({
  coachId,
}) => {
  const [showChat, setShowChat] = useState(false)
  const [coach, setCoach] = useState<CoachDataType | undefined>(undefined)

  const { loading } = useQuery(GET_COACH_BY_ID, {
    variables: { id: coachId },
    context: { ms: microServices.backend },
    onCompleted: (data) => setCoach(data.findCoachById),
  })

  return (
    <>
      {loading ? (
        <CoachProfileCardSkeleton />
      ) : (
        <>
          <Container className={classes.section}>
            <div className='text-center mb-4'>
              <Image
                width={182}
                height={182}
                alt='avatar'
                layout='intrinsic'
                className={classes.images}
                src='/assets/images/avatar.png'
              />
            </div>
            <div
              className={`text-center mb-4 ${classes.description_container}`}>
              <h3 className='fs-5 fw-bold'>{coach?.user.name}</h3>
              <p className='fs-6 mb-0'>{coach?.bio}</p>
            </div>
            <div
              className={`text-center mb-5 ${classes.specialization_container}`}>
              <h3 className='fs-5 fw-bold'>Especialización del coach</h3>
              <ul>
                {coach?.coachingAreas.map((area) => (
                  <li
                    key={area.id}
                    className={`fs-5 ${classes.especialization_skill}`}>
                    {area.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='mb-5 d-flex justify-content-around'>
              <Button className={classes.button}>
                <i className={PrimeIcons.CALENDAR} />
                <p className='fs-6'>10/11/21 10:00 AM</p>
              </Button>
              <Button
                onClick={() => setShowChat(true)}
                className={classes.button}>
                <i className={PrimeIcons.SEND} />
                <p className='fs-6'>BANDEJA</p>
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
      )}
    </>
  )
}
