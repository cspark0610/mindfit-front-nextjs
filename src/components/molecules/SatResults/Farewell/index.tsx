import Link from 'next/link'

// Bootstrap Component
import { Card, Container, Row, Button } from 'react-bootstrap'

// Animation Component
import { ColMotion } from 'components/atoms/AnimateComponents'

// Animation
import { viewportFadeIn } from 'commons/animations'

// Styles
import classes from 'styles/Farewell/farewell.module.scss'

// Types
import { FC } from 'react'

export const Farewell: FC<any> = (props) => (
  <Card className={classes.farewell}>
    <Card.Img
      className={classes.cardImg}
      src={props.background.data.attributes.url}
      alt={props.background.data.attributes.caption}
    />
    <Card.ImgOverlay className={classes.bg}>
      <Container className={classes.container}>
        <Row>
          <ColMotion {...viewportFadeIn} xs={6}>
            <p className={classes.header}>{props.title}</p>
            <h1 className={classes.title}>{props.subtitle}</h1>
            <div
              className={classes.paragraph}
              dangerouslySetInnerHTML={{ __html: props.details }}
            />
            <Link href='/library' passHref>
              <Button className={classes.button}>
                {props.actionButton.label}
              </Button>
            </Link>
          </ColMotion>
        </Row>
      </Container>
    </Card.ImgOverlay>
  </Card>
)
