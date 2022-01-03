import { FC } from 'react'
//next components
import Image from 'next/image'
import Link from 'next/link'
//styles
import { Button, Col, Row } from 'react-bootstrap'
import classes from 'styles/ChooseCoach/chooseCoach.module.scss'
//icons
import { Youtube } from 'react-bootstrap-icons'
//types
import { CoachDataType } from 'types/components/CoachCard'

interface CoachCardProps {
  data: CoachDataType
}

export const CoachCard: FC<CoachCardProps> = ({ data }) => {
  const { name, title, description, picture, videoThumb, videoUrl } = data

  return (
    <div className={classes.coachCard}>
      <Row>
        <Col xs={12} sm={4} className={classes.cardCol}>
          <div className={classes.leftSide}>
            <div className={classes.photo}>
              <Image src={picture} width={100} height={100} alt='coach photo' />
            </div>
            <Link href={videoUrl}>
              <a target='_blank'>
                <div className={classes.video}>
                  <Image
                    src={videoThumb}
                    width={80}
                    height={80}
                    alt='coach photo'
                  />
                  <Youtube
                    width={36}
                    height={36}
                    className={classes.ytIcon}
                    color='white'
                  />
                </div>
              </a>
            </Link>
          </div>
        </Col>
        <Col>
          <div className={classes.rightSide}>
            <div>
              <h4>{name}</h4>
              <p>{title}</p>
              <hr />
            </div>
            <p>{description}</p>
            <Button className={classes.button}>Elegir Coach</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
