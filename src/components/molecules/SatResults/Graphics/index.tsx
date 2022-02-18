// Main tools
import Image from 'next/image'

// components
import { ChartBar } from 'components/atoms/ChartBar'

// bootstrap components
import { Card, Col, Button } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// Animation components
import { RowMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// styles
import classes from 'styles/Graphics/graphics.module.scss'

// types
import { FC } from 'react'
import { getRandomColor } from 'commons'

export const Graph: FC<any> = (props) => {
  const colors: string[] = []

  const data = {
    labels: props.optionsLabel.map(({ label }: { label: string }) => label),
    datasets: props.result.puntuations.map((puntuation: any, idx: number) => ({
      label: props.optionsLabel[idx]?.label,
      backgroundColor: getRandomColor(colors),
      data: props.result.puntuations.map((_: any, index: number) =>
        index === idx ? puntuation.value : 0
      ),
      grouped: false,
    })),
  }

  return (
    <Card className={classes.bg}>
      <Card.Body className={classes.graphics}>
        <p className={classes.header}>{props.subtitle}</p>
        <h1 className={classes.title}>{props.title}</h1>
        <RowMotion {...viewportFadeIn} className='justify-content-center'>
          <Col md={6} lg={4}>
            <Image
              width={500}
              height={500}
              className={classes.img}
              src={props.image.data.attributes.url}
              alt={props.image.data.attributes.caption}
            />
            <Button className={classes.explore}>
              <Send className={classes.explore_icon} />
              {props.anchorText}
            </Button>
          </Col>
          <Col className='mt-5 mt-lg-0 pb-5' md={12} lg={8}>
            <ChartBar data={data} />
          </Col>
        </RowMotion>
      </Card.Body>
    </Card>
  )
}
