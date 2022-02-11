// Animation
import { fadeIn } from 'commons/animations'
import { CardMotion } from 'components/atoms/AnimateComponents'

// Bootstrap Component
import { Card } from 'react-bootstrap'

// Styles
import classes from 'styles/Cover/cover.module.scss'

// Type
import { FC } from 'react'

export const Cover: FC<any> = (props) => {
  return (
    <CardMotion {...fadeIn} className={`${classes.container} ${classes.bg}`}>
      <Card.Img
        className='opacity-25'
        src={props.background.data.attributes.url}
      />
      <Card.ImgOverlay className={classes.bg}>
        <h1
          className={classes.title}
          dangerouslySetInnerHTML={{ __html: props.title }}
        />

        <p className={classes.copyright}>{props.copyright}</p>
      </Card.ImgOverlay>
    </CardMotion>
  )
}
