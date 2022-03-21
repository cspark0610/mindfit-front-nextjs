// Bootstrap Component
import { Container } from 'react-bootstrap'

// Animation Component
import { RowMotion } from 'components/atoms/AnimateComponents'

// Animation
import { motion } from 'framer-motion'
import { viewportFadeIn } from 'commons/animations'

// Styles
import classes from 'styles/ProfileTypes/profileTypes.module.scss'

// Types
import { FC } from 'react'

export const ProfileTypes: FC<any> = (props) => (
  <Container className={classes.container}>
    <motion.div {...viewportFadeIn}>
      <p className={classes.header}>{props.subtitle}</p>
      <h1 className={`${classes.title} mb-5`}>{props.title}</h1>
    </motion.div>
    <Container>
      <RowMotion {...viewportFadeIn} xs={1} lg={2}>
        <div>
          <p className={classes.description}>{props.informationTitle}</p>
          <p dangerouslySetInnerHTML={{ __html: props.leftInformation }} />
        </div>
        <p dangerouslySetInnerHTML={{ __html: props.rightInformation }} />
      </RowMotion>
    </Container>
  </Container>
)
