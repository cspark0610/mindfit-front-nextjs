// Animation
import { fadeIn } from 'commons/animations'
import { CardMotion } from 'components/atoms/AnimateComponents'

// Bootstrap Component
import { Card, Container, Row, Col } from 'react-bootstrap'

// Styles
import classes from 'styles/Cover/cover.module.scss'

// Type
import { FC } from 'react'

export const Cover: FC<any> = (props) => {
  return (
    <CardMotion {...fadeIn} className={classes.cover}>
      <Card.Img
        className={classes.cardImg}
        src={props.background.data.attributes.url}
      />
      <Card.ImgOverlay className={classes.cardContainer}>
        <Container fluid>
          <Row>
            <Col className={classes.copyright} xs={12} md={1}>
              <p>{props.copyright}</p>
            </Col>
            <Col xs={11}>
              <h1
                className={classes.title}
                dangerouslySetInnerHTML={{ __html: props.title }}
              />
            </Col>
          </Row>
        </Container>
      </Card.ImgOverlay>
    </CardMotion>
  )
}
