import { Container, Row, Col, Button } from 'react-bootstrap'
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import classes from 'styles/Login/login.module.scss'

const LoginPage = () => {
  return (
    <Container className={`${classes.container}`}>
      <div>
        <img
          className={classes.logo}
          src='./icon/MINDFIT.svg'
          alt='Mindfit_Logo'
        />
      </div>
      <Row>
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          xl={{ span: 4, offset: 4 }}>
          <form className={`${classes.form} ${classes.section}`}>
            <Row>
              <InputText
                className={`${classes.marginInput} ${classes.input}`}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                placeholder='Email'
              />
            </Row>
            <Row>
              <Password
                inputClassName={`${classes.input}`}
                className={`${classes.marginInput} `}
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                placeholder='Contraseña'
              />
            </Row>
            <Row>
              <Button className={classes.marginButtom}>Iniciar sesión</Button>
            </Row>
            <p className={classes.textMargin}>Recuperar contraseña</p>
            <Row xs={2}>
              <p className={classes.textRight}>Explorar</p>
              <i className={classes.textLeft}>icon</i>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
