// Main tools
import Image from 'next/image'

// Animation
import { motion } from 'framer-motion'

// components
import { ChartBar } from 'components/atoms/ChartBar'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// styles
import classes from 'styles/Graphics/graphics.module.scss'

// types
import { FC } from 'react'

export const Graph: FC = () => {
  const puntuations = [
    { name: 'Implantador', value: 16.3 },
    { name: 'Coordinador', value: 3.8 },
    { name: 'Evaluador', value: 3.8 },
    { name: 'Creativo', value: 14.6 },
    { name: 'Investigador de recursos', value: 12.1 },
    { name: 'Trabajador de equipo', value: 4.6 },
    { name: 'Finalizador', value: 1.5 },
  ]

  let labels: string[] = []
  let value: number[] = []

  puntuations.map((item) => {
    labels.push(item.name)
    value.push(item.value)
  })

  const datasets = [
    {
      label: 'My data',
      backgroundColor: '#42A5F5',
      data: value,
    },
  ]

  const ContainerMotion = motion(Container)

  return (
    <ContainerMotion
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className={classes.container}>
      <Row>
        <p className={classes.header}>
          Ahora es el turno de conocer qué tipo de perfil tienes a la hora de
          trabajar en equipo
        </p>
        <h1 className={classes.title}>Trabajo en equipo</h1>
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
        <Col md={8}>
          <ChartBar labels={labels} datasets={datasets} />
        </Col>
      </Row>
    </ContainerMotion>
  )
}
