// main tools
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'
import {
  ChevronDoubleRight,
  CalendarEvent,
  Diagram2,
  Send,
} from 'react-bootstrap-icons'

// components
import { CoacheeProfileCardSkeleton } from 'components/atoms/CoacheeProfileCardSkeleton'

// utils
import { microServices } from 'commons'

// gql
import GET_CONTENT from 'lib/strapi/queries/Coachee/getCardContent.gql'
import { useQuery } from '@apollo/client'

// styles
import classes from 'styles/coachDashboard/page.module.scss'

// types
import { CoacheeDataType } from 'types/models/Coachee'
import { fileDataType } from 'types/models/Files'
import { FC, useState } from 'react'

export const CoacheeProfileCard: FC<{ coachee: CoacheeDataType }> = ({
  coachee,
}) => {
  const [content, setContent] = useState<any>(undefined)
  const { locale } = useRouter()

  const { loading } = useQuery(GET_CONTENT, {
    context: { ms: microServices.strapi },
    variables: { locale },
    onCompleted: (res) => {
      const [coacheeCard] = res.coacheeCards.data
      setContent(coacheeCard.attributes)
    },
  })

  return (
    <Col key={coachee.id} md={6} lg={4} xl={3}>
      {loading ? (
        <CoacheeProfileCardSkeleton />
      ) : (
        <div className={classes.section}>
          <Link href={`/detail-coachee/${coachee.id}`}>
            <a>
              <Image
                width={100}
                height={100}
                alt='user avatar'
                className={classes.profile}
                src={(coachee.profilePicture as fileDataType).location}
              />
              <p className={classes.name}>{coachee.user?.name}</p>
            </a>
          </Link>
          <p className='fw-bold m-0'>{content?.accordingToLabel}</p>
          <p>prueba de autoevaluación</p>
          <Row className='justify-content-center'>
            <Col xs={9}>
              {coachee.dimensionAverages?.map((area) => (
                <div className={classes.coachingArea} key={area.dimension}>
                  <p>
                    <ChevronDoubleRight />{' '}
                    {
                      content?.developmentAreas.find(
                        (developmentArea: any) =>
                          developmentArea.developmentAreas === area.dimension
                      ).label
                    }
                  </p>
                  <small>
                    {area.average}/{area.base}
                  </small>
                </div>
              ))}
            </Col>
          </Row>
          <Row className='my-3'>
            {coachee.organization && (
              <Col xs={12} className={classes.info}>
                <Diagram2 /> <span>{content?.organizationLabel}</span>
                <p>{coachee.organization?.name}</p>
              </Col>
            )}
            <Col xs={12} className={classes.info}>
              <CalendarEvent /> <span>{content?.signupFromLabel}</span>
              <p>{dayjs(coachee.user?.createdAt).format('DD/MM/YYYY')}</p>
            </Col>
            <Col xs={12} className={classes.info}>
              <CalendarEvent /> <span>{content?.coacheeFromLabel}</span>
              <p>{dayjs(coachee.user?.createdAt).format('DD/MM/YYYY')}</p>
            </Col>
          </Row>
          <Row className='justify-content-center'>
            <Col xs={5}>
              <Button className={classes.button}>
                <CalendarEvent />
                <p>10/11/21</p>
              </Button>
            </Col>
            <Col xs={5}>
              <Button className={classes.button}>
                <Send />
                <p>{content?.messageButton.label}</p>
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Col>
  )
}
