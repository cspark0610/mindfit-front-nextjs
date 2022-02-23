// components
import { Layout } from 'components/organisms/Layout'
import { AllCoachees } from 'components/organisms/DashboardCoach/AllCoachees'

// motion
import { ContainerMotion } from 'components/atoms/AnimateComponents'
import { viewportFadeIn } from 'commons/animations'

// bootstrap components
import { Tabs, Tab, Container, Row } from 'react-bootstrap'

// styles
import classes from 'styles/coachDashboard/page.module.scss'

// types
import { NextPage } from 'next'

const CoachDashboard: NextPage = () => {
  return (
    <Layout>
      <Container className={classes.container}>
        <Tabs className={classes.tabs} defaultActiveKey='all'>
          <Tab tabClassName={classes.tabs_item} title='Todos' eventKey='all'>
            <ContainerMotion className={classes.container} {...viewportFadeIn}>
              <Row>
                <h2 className={classes.title}>Todos los coachees</h2>
                <AllCoachees />
              </Row>
            </ContainerMotion>
          </Tab>
          <Tab
            title='Resumen'
            eventKey='resume'
            tabClassName={classes.tabs_item}>
            <ContainerMotion className={classes.container} {...viewportFadeIn}>
              <Row>
                <h2 className={classes.title}>Próximas citas</h2>
                <p>
                  Ellos se han registrado recientemente, ¡No te olvides de
                  saludarlos!
                </p>
                <AllCoachees />
              </Row>
            </ContainerMotion>
          </Tab>
        </Tabs>
      </Container>
    </Layout>
  )
}

export default CoachDashboard
