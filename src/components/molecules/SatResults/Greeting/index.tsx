// Main tools
import Image from 'next/image'

// Bootstrap Component
import { Container, Row, Button } from 'react-bootstrap'

// Styles
import classes from 'styles/Greeting/greeting.module.scss'

// Types
import { FC } from 'react'

export const Greeting: FC = () => {
  return (
    <Container className={classes.container}>
      <Row xs={1} md={2} className='h-100 align-items-center'>
        <div>
          <p className={`${classes.header} mb-5`}>
            Camino al autodescubrimiento
          </p>
          <h1 className={`${classes.greeting} mb-4`}>
            Hola, <b>Néstor</b>
          </h1>
          <p className={classes.paragraph}>
            Gracias a los datos que has aportado en el cuestionario, vas a poder
            descubrir sobre tu <b>Entorno emocional,</b> y sobre todo de tu{' '}
            <b>{`"yo"`} personal y profesional,</b> aspectos que quizá no
            conocías.
          </p>
          <p className={`${classes.paragraph} mb-5`}>
            Y todo, basado en el conocimiento de la evidencia cientifíca de los
            últimos años, que está permitiendo conocer mejor el comportamiento
            de la estructura más compleja del universo conocido, el{' '}
            <b>Cerebro humano.</b>
          </p>
          <Button className={classes.button}>Comencemos</Button>
        </div>
        <div>
          <Image
            src='/assets/icon/MINDFIT.svg'
            alt=''
            width={500}
            height={500}
          />
        </div>
      </Row>
    </Container>
  )
}
