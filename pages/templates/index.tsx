// Component
import { SAT_TEMPLATES } from 'components/molecules/SatResults'
import { Layout } from 'components/organisms/Layout'
import { Container } from 'react-bootstrap'

// Boostrap Component
import Carousel from 'react-bootstrap/Carousel'

// Styles
import classes from 'styles/SatTemplates/satTemplates.module.scss'

const Template = () => {
  return (
    <Layout>
      <Container fluid className={classes.container}>
        <Carousel className={classes.carouselShadow}>
          {/* <Carousel.Item>{SAT_TEMPLATES['cover']()}</Carousel.Item> */}
          <Carousel.Item className={` ${classes.gradient} ${classes.bg}`}>
            <SAT_TEMPLATES.cover />
          </Carousel.Item>

          <Carousel.Item className={classes.bg}>
            <SAT_TEMPLATES.greeting />
          </Carousel.Item>

          <Carousel.Item className={classes.bg}>
            <SAT_TEMPLATES.profileTypes />
          </Carousel.Item>

          <Carousel.Item className={classes.bg}>
            <SAT_TEMPLATES.graphics />
          </Carousel.Item>

          <Carousel.Item className={classes.bg}>
            <SAT_TEMPLATES.percentages />
          </Carousel.Item>

          <Carousel.Item className={classes.bg}>
            <SAT_TEMPLATES.farewell />
          </Carousel.Item>
        </Carousel>
      </Container>
    </Layout>
  )
}

export default Template
