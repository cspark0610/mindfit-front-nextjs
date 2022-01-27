// Main tools
import Image from 'next/image'

// components
import { ChartBar } from 'components/atoms/Graphics/ChartBar'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// styles
import classes from 'styles/SatResults/satTemplate.module.scss'

// types
import { FC } from 'react'

export const Graph: FC = () => {
  const labels = [
    'Implantador',
    'Coordinador',
    'Evaluador',
    'Creativo',
    'Investigador de recursos',
    'Trabajador de equipo',
    'Finalizador',
  ]
  const data = [16.3, 3.8, 3.8, 14.6, 12.1, 4.6, 1.5]

  return (
    <Container className={classes.container}>
      <Container>
        <Row className={classes.row}>
          <div className={classes.subtitle}>
            Ahora es el turno de conocer qué tipo de perfil tienes a la hora de
            trabajar en equipo
          </div>
          <h1 className={classes.title}>Trabajo en equipo</h1>
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
          <Col md={8}>
            <ChartBar name='lorem' labels={labels} data={data} />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
