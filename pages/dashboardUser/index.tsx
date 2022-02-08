// bootstrap components
import { Layout } from 'components/organisms/Layout'
import { Container } from 'react-bootstrap'

// components
import { UserProfile } from 'components/organisms/DashboardUser'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { NextPage } from 'next'

const DashboardUser: NextPage = () => (
  <Layout>
    <Container className={classes.container}>
      <Container fluid className={classes.section}>
        <UserProfile />
      </Container>
    </Container>
  </Layout>
)

export default DashboardUser
