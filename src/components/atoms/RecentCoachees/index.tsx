//next components
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'

// components

//styles
import classes from 'styles/Messages/menuPage.module.scss'

//types
import { FC } from 'react'

export const RecentCoacheesCard: FC = () => {
  return (
    <Container className={`mb-4 ${classes.section}`}>
      <Row>
        <Col xs={12} sm='auto'>
          <Image
            width={100}
            height={100}
            alt='coach photo'
            src='/assets/images/avatar.png'
          />
        </Col>
        <Col className={classes.rightSide}>
          <Row>
            <h4 className='fw-bold' >Camila Garcia</h4>
            <p>Organización Mindfit</p>
          </Row>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
          <Button variant='secondary' className={classes.button}>
            Iniciar conversación
          </Button>
        </Col>
      </Row>
    </Container>
  )
}
