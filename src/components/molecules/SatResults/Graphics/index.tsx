// Main tools
import Image from 'next/image'

// components
import { ChartBar } from 'components/atoms/ChartBar'

// bootstrap components
import { Col, Row } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// Animation components
import { ContainerMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// styles
import classes from 'styles/Graphics/graphics.module.scss'

// types
import { FC } from 'react'

export const Graph: FC<any> = (props) => {
  const puntuations = [
    { name: 'Implantador', value: 16.3 },
    { name: 'Coordinador', value: 3.8 },
    { name: 'Evaluador', value: 3.8 },
    { name: 'Creativo', value: 14.6 },
    { name: 'Investigador de recursos', value: 12.1 },
    { name: 'Trabajador de equipo', value: 4.6 },
    { name: 'Finalizador', value: 1.5 },
  ]

  const data = {
    labels: puntuations.map((item: any) => item.name),
    datasets: [
      {
        label: 'My name',
        backgroundColor: '#1a7bee',
        data: puntuations.map((item) => item.value),
      },
    ],
  }

  return (
    <ContainerMotion
      fluid
      {...viewportFadeIn}
      className={`${classes.container} ${classes.bg}`}>
      <Row>
        <p className={classes.header}>{props.title}</p>
        <h1 className={classes.title}>{props.subtitle}</h1>
      </Row>
      <Row>
        <Col lg={4}>
          <Image
            className={classes.img}
            src='/assets/icon/MINDFIT.svg'
            alt=''
            width={500}
            height={500}
          />
          <p>
            <Send className={classes.icon} />
            {props.anchorText}
          </p>
        </Col>
        <Col lg={8}>
          <ChartBar data={data} />
        </Col>
      </Row>
    </ContainerMotion>
  )
}
