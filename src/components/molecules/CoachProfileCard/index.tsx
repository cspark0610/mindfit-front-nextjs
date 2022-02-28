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
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { ChevronDoubleRight } from 'react-bootstrap-icons'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Styles
import classes from 'styles/CoachProfileCard/coachProfileCard.module.scss'

// types
import { FC } from 'react'
import { CoachDataType } from 'types/models/Coach'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

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
            <div className='text-center'>
              <Image
                width={120}
                height={120}
                alt='avatar'
                layout='intrinsic'
                className={classes.img}
                src='/assets/images/avatar.png'
              />
            </div>
            <div className={classes.profile}>
              <h3>{coach?.user?.name}</h3>
              <span>{coach?.bio}</span>
            </div>
            <div className={classes.coachingAreas}>
              <h3>Coach specialization</h3>
              <ul>
                <li>
                  <ChevronDoubleRight /> Leadership development
                </li>
                <li>
                  <ChevronDoubleRight /> Positive Psychology
                </li>
                <li>
                  <ChevronDoubleRight /> Human Development
                </li>
                <li>
                  <ChevronDoubleRight /> Mental Wellness
                </li>
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
