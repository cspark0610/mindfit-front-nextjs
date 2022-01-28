// Main tools
import Image from 'next/image'

// Bootstrap Component
import { Container, Button } from 'react-bootstrap'

// Animation Component
import { RowMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// Styles
import classes from 'styles/Farewell/farewell.module.scss'

// Types
import { FC } from 'react'

export const Farewell: FC = () => {
  return (
    <Container
      {...viewportFadeIn}
      className={`${classes.container} d-flex align-items-center`}>
      <RowMotion {...viewportFadeIn} xs={1} md={2}>
        <div>
          <p className={classes.header}>Hacia tu mejor versión</p>
          <h1 className={`${classes.title} mb-4`}>
            Ahora es tu <b>turno</b>
          </h1>
          <p className={`${classes.paragraph} mb-5`}>
            Posiblemente conozcas algo más de{' '}
            <b>la grandeza que llevas dentro.</b> Eres un ser único con un
            cerebro irrepetible, con un potencial enorme que pueda impactar
            positivamente en tu entorno. Ahora es el momento que te pongas a
            trabajar en ellos, en un viaje emocionante, y consigas{' '}
            <b>la mejor versión de ti mismo.</b> Todo está en tus manos.
          </p>
          <Button className={classes.button}>
            Accede a los recursos que te ayuden a alcanzar tu mejor versión
          </Button>
        </div>
        <div>
          <Image
            src='/assets/icon/MINDFIT.svg'
            alt=''
            width={500}
            height={500}
          />
        </div>
      </RowMotion>
    </Container>
  )
}
