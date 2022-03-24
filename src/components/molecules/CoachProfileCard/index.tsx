// Main tools
import { useState } from 'react'
import Image from 'next/image'

// gql
import GET_ASSIGNED_COACH from 'lib/queries/Coachee/getAssignedCoach.gql'
import { useQuery } from '@apollo/client'

// utils
import { microServices } from 'commons'

// components
import { CoachProfileCardSkeleton } from 'components/atoms/CoachProfileCardSkeleton'
import { ChatSession } from 'components/organisms/chatSession'

// Bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { ChevronDoubleRight } from 'react-bootstrap-icons'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Styles
import classes from 'styles/CoachProfileCard/coachProfileCard.module.scss'

// types
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { CoachDataType } from 'types/models/Coach'
import { FC } from 'react'

export const CoachProfileCard: FC = () => {
  const [showChat, setShowChat] = useState(false)
  const [coach, setCoach] = useState<CoachDataType | undefined>(undefined)

  const { loading } = useQuery(GET_ASSIGNED_COACH, {
    context: { ms: microServices.backend },
    onCompleted: (data) => setCoach(data.getCoacheeProfile.assignedCoach),
  })

  return (
    <>
      {loading ? (
        <CoachProfileCardSkeleton />
      ) : (
        <>
          <Container className={classes.section}>
            <div className='text-center'>
              {coach?.profilePicture && (
                <Image
                  width={120}
                  alt='avatar'
                  height={120}
                  layout='intrinsic'
                  className={classes.img}
                  src={coach?.profilePicture?.location as string}
                />
              )}
            </div>
            <div className={classes.profile}>
              <h3>{coach?.user?.name}</h3>
              <span>{coach?.bio}</span>
            </div>
            <div className={classes.coachingAreas}>
              <h3>Coach specialization</h3>
              <ul>
                {coach?.coachingAreas?.map((area) => (
                  <li key={area.id}>
                    <ChevronDoubleRight /> {area.name}
                  </li>
                ))}
              </ul>
            </div>
            <Row>
              <Col xs={6}>
                <Button className={classes.button}>
                  <i className={PrimeIcons.CALENDAR} />
                  <p>10/11/21</p>
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  onClick={() => setShowChat(true)}
                  className={classes.button}>
                  <i className={PrimeIcons.SEND} />
                  <p>MESSAGES</p>
                </Button>
              </Col>
              <ExploreBadge />
            </Row>
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
