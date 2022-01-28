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

// styles
import classes from 'styles/SatResults/satTemplate.module.scss'

// types
import { FC } from 'react'

export const Percentages: FC = () => {
  const overlayTooltip = () => <Tooltip>Loren ipsum</Tooltip>
  return (
    <Container className={classes.container}>
      <Container>
        <Row className={classes.row}>
          <div className={classes.subtitle}>
            Ahora es el turno de los resultados referentes a la empresa
          </div>
          <h1 className={classes.title}>Comunicación en la empresa</h1>
        </Row>
        <Row className={classes.row}>
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
            <h4>¿Qué significan estos factores?</h4>
            <p>
              Los resultados obtenidos en estos tres factores, se encuentran
              destacadamente por encima de la media deseable en entornos
              corporativos, estando la comunicación horizontal ligeramente por
              debajo de la ascendente o descendente.
            </p>
            <p>
              En las empresas, los efectos positivos de la comunicación son
              evidentes: mejora la competitividad de la organización, así como
              la forma en la que se puede adaptar a los cambios que se produzcan
              en su entorno, con el fin de conseguir los objetivos que se hayan
              propuesto inicialmente. Al mismo tiempo, la existencia de una
              comunicación en la empresa eficaz, fomenta la motivación de los
              empleados, así como el compromiso y la implicación en las tareas
              corporativas, creando un clima de trabajo integrador.
            </p>
            <p>
              Por ello, a pesar de encontrarnos en niveles por encima de la
              media deseable, todo esfuerzo por mejorar dicha comunicación
              corporativa, incidirá en la mejora en todos esos efectos.
            </p>
            <Button>Adceder a los recursos</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
