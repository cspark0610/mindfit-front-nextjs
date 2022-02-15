// Main tools
import Image from 'next/image'

// Animation
import { motion } from 'framer-motion'
import { viewportFadeIn } from 'commons/animations'

// Bootstrap Component
import { Row, Button, Container, Card } from 'react-bootstrap'

// Styles
import classes from 'styles/Greeting/greeting.module.scss'

// Types
import { FC } from 'react'
import { useSession } from 'next-auth/react'

export const Greeting: FC<any> = (props) => {
  const { data } = useSession()

  return (
    <Card className={classes.cardContainer}>
      <Card.Img></Card.Img>
      <Card.ImgOverlay className={classes.bg}>
        <Container className={classes.container}>
          <Row xs={1} lg={2}>
            <motion.div {...viewportFadeIn}>
              <h1 className={`${classes.header} mb-5`}>{props.title}</h1>
              <p className={`${classes.greeting} mb-4`}>
                {props.subtitle}, <b>{data?.user?.name}</b>
              </p>
              <p
                className={classes.paragraph}
                dangerouslySetInnerHTML={{ __html: props.details }}
              />

              <Button className={classes.button}>
                {props.actionButton.label}
              </Button>
            </motion.div>
            <motion.div
              {...viewportFadeIn}
              className='d-flex align-items-center'>
              <Image
                src='/assets/icon/MINDFIT.svg'
                alt=''
                width={500}
                height={500}
              />
            </motion.div>
          </Row>
        </Container>
      </Card.ImgOverlay>
    </Card>
  )
}
