// Main tools
import Image from 'next/image'

// Animation
import { motion } from 'framer-motion'

// bootstrap components
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// Animation Components
import { ContainerMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// styles
import classes from 'styles/Percentages/percentages.module.scss'

// types
import { FC } from 'react'

export const Percentages: FC = () => {
  const overlayTooltip = () => <Tooltip>Loren ipsum</Tooltip>
  return (
    <ContainerMotion {...viewportFadeIn} className={classes.container}>
      <Row>
        <p className={classes.header}>
          Ahora es el turno de los resultados referentes a la empresa
        </p>
        <h1 className={classes.title}>Comunicación en la empresa</h1>
      </Row>
      <Row>
        <Col md={4}>
          <Image
            className={classes.img}
            src='/assets/icon/MINDFIT.svg'
            alt=''
            width={500}
            height={500}
          />
          <p>
            <Send className={classes.icon} />
            Descubre cómo se comunican los miembros de tu empresa
          </p>
        </Col>
        <Col md={3}>
          {[0, 1, 2].map((item) => (
            <OverlayTrigger
              key={item}
              placement='bottom'
              overlay={overlayTooltip()}>
              <div className={classes.cardPoint}>
                <h4>
                  <span className={classes.point}>4,3</span> / 5
                </h4>
                <div>Comunicación ascendente</div>
              </div>
            </OverlayTrigger>
          ))}
        </Col>
        <Col md={5}>
          <p className={classes.subtitle}>¿Qué significan estos factores?</p>
          <p>
            Los resultados obtenidos en estos tres factores, se encuentran
            destacadamente por encima de la media deseable en entornos
            corporativos, estando la comunicación horizontal ligeramente por
            debajo de la ascendente o descendente.
          </p>
          <p>
            En las empresas, los efectos positivos de la comunicación son
            evidentes: mejora la competitividad de la organización, así como la
            forma en la que se puede adaptar a los cambios que se produzcan en
            su entorno, con el fin de conseguir los objetivos que se hayan
            propuesto inicialmente. Al mismo tiempo, la existencia de una
            comunicación en la empresa eficaz, fomenta la motivación de los
            empleados, así como el compromiso y la implicación en las tareas
            corporativas, creando un clima de trabajo integrador.
          </p>
          <p>
            Por ello, a pesar de encontrarnos en niveles por encima de la media
            deseable, todo esfuerzo por mejorar dicha comunicación corporativa,
            incidirá en la mejora en todos esos efectos.
          </p>
          <Button className={classes.button}>Adceder a los recursos</Button>
        </Col>
      </Row>
    </ContainerMotion>
  )
}
