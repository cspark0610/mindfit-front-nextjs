// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Check2, Question } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import { validateUserSignup } from './utils'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'

export const UserSignup: FC = () => {
  const [userData, setUserData] = useState({
    profilePicture: {} as File,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (ev: ChangeType) =>
    setUserData({ ...userData, [ev.target.name]: ev.target.value })

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Registra tu usuario</h1>
      <UploadPicture setUserData={setUserData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12}>
            <InputText
              name='firstName'
              value={userData.firstName}
              onChange={handleChange}
              placeholder='Nombre'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='lastName'
              value={userData.lastName}
              onChange={handleChange}
              placeholder='Apellido'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='email'
              type='email'
              value={userData.email}
              onChange={handleChange}
              placeholder='Email'
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <Password
              toggleMask
              feedback={false}
              name='password'
              value={userData.password}
              onChange={handleChange}
              placeholder='Contraseña'
              className='w-100'
              inputClassName={classes.input}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className={classes.row}>
          <Col xs={1} className={classes.mark}>
            {validateUserSignup(userData) ? <Check2 /> : <Question />}
          </Col>
          <Col xs={10}>
            <Button className={classes.button}>Registra tu usuario</Button>
          </Col>
          <ExploreBadge />
        </Row>
      </Container>
    </section>
  )
}
