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
import { Data } from 'types/components/CoachCard'

interface CoachCardProps {
  data: Data
}

export const CoachCard: FC<CoachCardProps> = ({ data }) => {
  const { name, title, description, picture, videoThumb, videoUrl } = data

  return (
    <Col xs={12} md={8} lg={5} className='mb-4'>
      <div className={classes.coachCard}>
        <Row>
          <Col
            xs={12}
            sm={4}
            className='d-flex flex-column justify-content-center'>
            <div className={classes.leftSide}>
              <div className={'photo'}>
                <Image
                  src={picture}
                  width={100}
                  height={100}
                  alt='coach photo'
                />
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
              <div className='title'>
                <h4 className='mb-0'>{name}</h4>
                <p className='mb-0'>{title}</p>
                <hr className='mt-2' />
              </div>
              <p className='description'>{description}</p>
              <Button className='rounded-container px-5 py-2'>
                Elegir Coach
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Col>
  )
}
