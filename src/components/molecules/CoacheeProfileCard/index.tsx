// main tools
import Image from 'next/image'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// primeicons
import { PrimeIcons } from 'primereact/api'

// styles
import classes from 'styles/CoacheeProfileCard/coacheeProfileCard.module.scss'

// types
import { FC } from 'react'
import { Diagram2, EmojiSmile } from 'react-bootstrap-icons'

export const CoacheeProfileCard: FC = () => {
  return (
    <>
      <Row className={classes.card}>
        <div className='text-center mb-4'>
          <Image
            width={100}
            height={100}
            alt='avatar'
            layout='intrinsic'
            src='/assets/images/userAvatar.svg'
          />
        </div>
        <div className={`text-center mb-4 ${classes.description_container}`}>
          <h3 className='fs-5 fw-bold'>Nestor García</h3>
        </div>
        <h3 className='text-center fs-5 mb-4'>perfil segun SAT</h3>
        <div className='text-center mb-5'>
          <Row>
            {[0, 1, 2, 3].map((item) => (
              <p key={item} className={`fw-bold ${classes.results}`}>
                <EmojiSmile className='me-2' />
                Motivación 10/10
              </p>
            ))}
          </Row>
        </div>
        <div className='text-center mb-5'>
          <Row>
            {[0, 1, 2].map((item) => (
              <div key={item}>
                <h6 className={`fw-bold ${classes.profile}`}>
                  <Diagram2 className='me-2' />
                  Organización
                </h6>
                <p>Company Minfit</p>
              </div>
            ))}
          </Row>
        </div>
      </Row>
      <Row>
        <Col xs={6}>
          <Button className={classes.button}>
            <i className={PrimeIcons.CALENDAR} />
            <p>10/11/21</p>
          </Button>
        </Col>
        <Col xs={6}>
          <Button className={classes.button}>
            <i className={PrimeIcons.SEND} />
            <p>Chat</p>
          </Button>
        </Col>
      </Row>
    </>
  )
}
