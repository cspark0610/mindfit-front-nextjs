// Main tools
import Image from 'next/image'

// bootstrap components
import { Button, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// Animation Components
import { ContainerMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// styles
import classes from 'styles/Percentages/percentages.module.scss'

// types
import { FC } from 'react'

export const Percentages: FC<any> = (props) => {
  const qualificationData = props.qualificationData.data

  const comunicationData = props.satResults.result.find(
    (result: any) => result.areaCodeName === 'SUBORDINATE'
  )
  const getQualification = (section: any, title: string) => {
    return section.puntuations.find(
      (puntuation: any) => puntuation.name === title
    )
  }

  const overlayTooltip = () => <Tooltip>Loren ipsum</Tooltip>
  return (
    <ContainerMotion fluid {...viewportFadeIn} className={classes.container}>
      <Row>
        <p className={classes.header}>{props.subtitle}</p>
        <h1 className={classes.title}>{props.title}</h1>
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
        <Col lg={3}>
          {qualificationData.map((data: any, idx: number) => {
            const area = getQualification(
              comunicationData,
              data.attributes.category
            )
            return (
              <OverlayTrigger
                key={idx}
                placement='bottom'
                overlay={overlayTooltip()}>
                <div className={classes.cardPoint}>
                  <h4>
                    <span className={classes.point}>{area.value}</span> /{' '}
                    {area.base}
                  </h4>
                  <div>{data.attributes.title}</div>
                </div>
              </OverlayTrigger>
            )
          })}
        </Col>
        <Col lg={5}>
          <ul>
            {qualificationData.map(({ attributes }: any, idx: number) => (
              <li key={idx}>
                <p>{attributes.title}</p>
                <div
                  dangerouslySetInnerHTML={{ __html: attributes.description }}
                />
              </li>
            ))}
          </ul>

          <Button className={classes.button}>Acceder a los recursos</Button>
        </Col>
      </Row>
    </ContainerMotion>
  )
}
