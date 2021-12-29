// bootstrap components
import { Container } from 'react-bootstrap'

// styles
import classes from 'styles/signup/org.module.scss'

// types
import { NextPage } from 'next'
import { UserSignup } from 'components/modelules/UserSignup'

const SignupOrgUserPage: NextPage = () => (
  <Container className={classes.container}>
    <Container fluid className={classes.card}>
      <UserSignup />
    </Container>
  </Container>
)

export default SignupOrgUserPage
