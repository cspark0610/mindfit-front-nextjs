// main tools
import { useState } from 'react'
import { signIn } from 'next-auth/react'

// bootstrap components
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { Check2, Question } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// utils
import { validateUserSignup } from './utils'

// commons
import { regex } from 'commons'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'

export const UserSignup: FC = () => {
  const [userData, setUserData] = useState({
    picture: {} as File,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (ev: ChangeType) =>
    setUserData({ ...userData, [ev.target.name]: ev.target.value })

  const handleSignup = () => {
    signIn('credentials', {
      email: userData.email,
      password: userData.password,
      callbackUrl: '/signup/organization/company',
    })
  }

  const overlayTooltip = () => (
    <Tooltip>Por favor, complete todos los campos para continuar</Tooltip>
  )

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>Registra tu usuario</h1>
      <UploadPicture setData={setUserData} />
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
              className='w-100'
              name='password'
              placeholder='Contraseña'
              promptLabel='Sugerencias'
              weakLabel='Contraseña muy corta'
              mediumLabel='Por favor, tenga en cuenta las sugerencias'
              strongLabel='Contraseña aceptada'
              mediumRegex={regex.minSize.source}
              strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              value={userData.password}
              inputClassName={classes.input}
              footer={passwordSuggestionsTemplate}
              onChange={handleChange}
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          {validateUserSignup(userData) ? (
            <Col xs={12} sm={1} className={classes.mark}>
              <Check2 />
            </Col>
          ) : (
            <OverlayTrigger placement='bottom' overlay={overlayTooltip()}>
              <Col xs={12} sm={1} className={classes.mark}>
                <Question className={classes.tip} />
              </Col>
            </OverlayTrigger>
          )}
          <Col xs={12} sm={10}>
            <Button
              disabled={!validateUserSignup(userData)}
              onClick={handleSignup}
              className={classes.button}>
              Registra tu usuario
            </Button>
          </Col>
        </Row>
        <ExploreBadge />
      </Container>
    </section>
  )
}
