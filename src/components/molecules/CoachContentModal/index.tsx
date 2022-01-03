// Main tools
import Image from 'next/image'

// Styles
import { Container, Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/CoachContentModal/coachContentModel.module.scss'

// Types
import { FC } from 'react'

interface props {
  imageProfile: string
  name: string
  occupation: string
  description: string
  urlVideo: string
}

export const CoachContentModal: FC<props> = ({
  imageProfile,
  name,
  occupation,
  description,
  urlVideo,
}) => {
  return (
    <Container fluid className={classes.container}>
      <Row className='text-center mb-4'>
        <div>
          <Image
            src={imageProfile}
            alt='Mindfit Logo'
            width={150}
            height={150}
            layout='intrinsic'
            className={classes.images}
          />
        </div>
        <h2 className={`${classes.coach_data} fw-bold`}>{name}</h2>
        <p className={`${classes.coach_data} fw-normal`}>{occupation}</p>
      </Row>
      <Row className='mb-5'>
        <p className={`mb-4 ${classes.coach_description}`}>{description}</p>
        {/* <div className='text-end'>
          <Button className={classes.button}>Ver Mas..</Button>
        </div> */}
      </Row>
      <Row className='mb-5'>
        <video src={urlVideo} controls />
      </Row>
    </Container>
  )
}
