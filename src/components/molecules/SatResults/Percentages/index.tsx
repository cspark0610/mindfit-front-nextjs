// Main tools
import Image from 'next/image'
import Link from 'next/link'

// bootstrap components
import { Col, OverlayTrigger, Tooltip, Card, Button } from 'react-bootstrap'
import { Send } from 'react-bootstrap-icons'

// Animation Components
import { RowMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// styles
import classes from 'styles/Percentages/percentages.module.scss'

// types
import { FC } from 'react'

export const Percentages: FC<any> = (props) => {
  const qualificationData = props.qualificationData.data

  const getContent = (diagnostic: string) =>
    qualificationData.find(
      ({ attributes }: any) => attributes.diagnostic === diagnostic
    )

  const overlayTooltip = (content: string) => <Tooltip>{content}</Tooltip>

  return (
    <Card className={classes.bg}>
      <Card.Body className={classes.percentages}>
        <p className={classes.header}>{props.subtitle}</p>
        <h1 className={classes.title}>{props.title}</h1>
        <RowMotion {...viewportFadeIn} className='justify-content-center'>
          <Col md={6} xl={3}>
            <Image
              width={500}
              height={500}
              className={classes.img}
              src={props.image.data.attributes.url}
              alt={props.image.data.attributes.caption}
            />
            <Link
              href={`/library?category="${props.postCategory.data.attributes.category}"`}
              passHref>
              <Button className={classes.explore}>
                <Send className={classes.explore_icon} />
                {props.anchorText}
              </Button>
            </Link>
          </Col>
          <Col md={6} xl={3}>
            {props.result.puntuations.map((puntuation: any, idx: number) => (
              <OverlayTrigger
                key={idx}
                placement='left'
                overlay={overlayTooltip(puntuation.name)}>
                <div className={classes.cardPoint}>
                  <h4>
                    <span className={classes.point}>
                      {puntuation.value.toFixed(1)}
                    </span>{' '}
                    / {puntuation.base}
                  </h4>
                </div>
              </OverlayTrigger>
            ))}
          </Col>
          <Col className={classes.description} lg={9} xl={5}>
            {props.infoTitle && <h4>{props.infoTitle}</h4>}
            {props.infoValue && (
              <div dangerouslySetInnerHTML={{ __html: props.infoValue }} />
            )}
            {qualificationData.length > 0 && (
              <ul>
                {props.result.diagnostics.map(
                  (diagnostic: string, idx: number) => {
                    const content = getContent(diagnostic)
                    return (
                      <li key={idx}>
                        <p>{content?.attributes?.title}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: content?.attributes?.description,
                          }}
                        />
                      </li>
                    )
                  }
                )}
              </ul>
            )}
          </Col>
        </RowMotion>
      </Card.Body>
    </Card>
  )
}
