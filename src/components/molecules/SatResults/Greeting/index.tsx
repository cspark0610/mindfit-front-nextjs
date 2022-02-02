// Main tools
import Image from 'next/image'

// Animation
import { motion } from 'framer-motion'
import { viewportFadeIn } from 'commons/animations'

// Bootstrap Component
import { Row, Button, Container } from 'react-bootstrap'

// Styles
import classes from 'styles/Greeting/greeting.module.scss'

// Types
import { FC } from 'react'

export const Greeting: FC = () => {
  return (
    <Container className={classes.container}>
      <Row xs={1} md={2}>
        <motion.div {...viewportFadeIn}>
          <h1 className={`${classes.header} mb-5`}>
            Camino al autodescubrimiento
          </h1>
          <p className={`${classes.greeting} mb-4`}>
            Hola, <b>Néstor</b>
          </p>
          <p className={classes.paragraph}>
            Gracias a los datos que has aportado en el cuestionario, vas a poder
            descubrir sobre tu <b>Entorno emocional,</b> y sobre todo de tu{' '}
            <b>{'"yo"'} personal y profesional,</b> aspectos que quizá no
            conocías.
          </p>
          <p className={`${classes.paragraph} mb-5`}>
            Y todo, basado en el conocimiento de la evidencia cientifíca de los
            últimos años, que está permitiendo conocer mejor el comportamiento
            de la estructura más compleja del universo conocido, el{' '}
            <b>Cerebro humano.</b>
          </p>
          <Button className={classes.button}>Comencemos</Button>
        </motion.div>
        <motion.div {...viewportFadeIn}>
          <Image
            src='/assets/icon/MINDFIT.svg'
            alt=''
            width={500}
            height={500}
          />
        </motion.div>
      </Row>
    </Container>
  )
}
