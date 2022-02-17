// Main tools
import Image from 'next/image'

// Animation
import { motion } from 'framer-motion'
import { viewportFadeIn } from 'commons/animations'

// Bootstrap Component
import { Row, Container, Card, Col } from 'react-bootstrap'

// Styles
import classes from 'styles/Greeting/greeting.module.scss'

// Types
import { FC } from 'react'
import { useSession } from 'next-auth/react'

export const Greeting: FC<any> = (props) => {
  const { data } = useSession()

  return (
    <Card className={classes.greetingCard}>
      <Card.Img
        className={classes.cardImg}
        src={props.background.data.attributes.url}
        alt={props.background.data.attributes.caption}
      />
      <Card.ImgOverlay className={classes.bg}>
        <Container className={classes.container}>
          <Row className='justify-content-between px-3'>
            <Col xs={12} lg={8}>
              <motion.div {...viewportFadeIn}>
                <h1 className={`${classes.header} mb-5`}>{props.title}</h1>
                <p className={`${classes.greeting} mb-4`}>
                  {props.subtitle}, <b>{data?.user?.name}</b>
                </p>
                <div
                  className={classes.paragraph}
                  dangerouslySetInnerHTML={{ __html: props.details }}
                />
              </motion.div>
            </Col>
            <Col className='d-none d-lg-flex align-items-end' xs={12} lg={3}>
              <motion.div {...viewportFadeIn}>
                <Image
                  src='/assets/icon/MINDFIT.svg'
                  alt=''
                  width={500}
                  height={500}
                />
              </motion.div>
            </Col>
          </Row>
        </Container>
      </Card.ImgOverlay>
    </Card>
  )
}
