// Main tools
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'

// gql
import GET_ASSIGNED_COACH from 'lib/queries/Coachee/getAssignedCoach.gql'
import GET_CONTENT from 'lib/strapi/queries/Coach/getCardContent.gql'
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
import { fileDataType } from 'types/models/Files'
import { FC } from 'react'

export const CoachProfileCard: FC = () => {
  const [coach, setCoach] = useState<CoachDataType | undefined>(undefined)
  const [content, setContent] = useState<any>(undefined)
  const [showChat, setShowChat] = useState(false)
  const { locale } = useRouter()

  const { loading } = useQuery(GET_ASSIGNED_COACH, {
    context: { ms: microServices.backend },
    onCompleted: (data) => setCoach(data.getCoacheeProfile.assignedCoach),
  })
  const { loading: contentLoading } = useQuery(GET_CONTENT, {
    variables: { locale },
    context: { ms: microServices.strapi },
    onCompleted: (res) => {
      const [coachCard] = res.coachCards.data
      setContent(coachCard.attributes)
    },
  })

  return (
    <>
      {loading || contentLoading ? (
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
                  src={
                    (coach?.profilePicture as fileDataType)?.location as string
                  }
                />
              )}
            </div>
            <div className={classes.profile}>
              <h3>{coach?.user?.name}</h3>
              <span>{coach?.bio}</span>
            </div>
            <div className={classes.coachingAreas}>
              <h3>{content?.specializationLabel}</h3>
              <ul>
                {coach?.coachingAreas?.map((area) => (
                  <li key={area.id}>
                    <ChevronDoubleRight />{' '}
                    {
                      content?.coachingArea.find(
                        (coachingArea: any) =>
                          coachingArea.codeName === area.codename
                      )?.label
                    }
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
                  <p>{content?.messageButton.label}</p>
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
