// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import { validateUserSignup } from 'components/organisms/Signup/utils'

// styles
import classes from 'styles/UserProfile/userProfile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { ColaboratorDataType } from 'types/models/Colaborator'
import { CheckSquare } from 'react-bootstrap-icons'

export const UserProfile: FC = () => {
  const [changePassword, setchangePassword] = useState(false)
  const [userData, setUserData] = useState<ColaboratorDataType>({
    picture: {} as File,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    position: '',
  })

  const handleChange = (ev: ChangeType) =>
    setUserData({ ...userData, [ev.target.name]: ev.target.value })

  return (
    <>
      <section className={classes.container}>
        <h1 className={classes.title}>Perfil de usuario</h1>
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
                disabled
                name='email'
                value={userData.email}
                placeholder='Email'
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <InputText
                name='position'
                value={userData.position}
                onChange={handleChange}
                placeholder='posición o cargo'
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <p
                className={classes.recoveryLabel}
                onClick={() => setchangePassword(true)}>
                Cambiar contraseña
              </p>
            </Col>
            <Col xs='auto' className={classes.rigth}>
              <Button disabled={!validateUserSignup(userData)}>Guardar</Button>
            </Col>
          </Row>
          <ExploreBadge />
        </Container>
      </section>
      <Modal
        size='lg'
        centered
        className={classes.modal}
        show={changePassword}
        onHide={() => setchangePassword(false)}>
        <Modal.Header closeButton className={classes.close} />
        <Modal.Body className={classes.section_modal}>
          <form>
            <section className={classes.container}>
              <h1 className={classes.title}>Cambiar contraseña</h1>
              <Container fluid>
                <Row className={classes.row}>
                  <Col xs={12}>
                    <Password
                      toggleMask
                      feedback={false}
                      name='password'
                      inputClassName={classes.input}
                      className='w-100'
                      placeholder='Contraseña actual'
                    />
                  </Col>
                  <Col xs={12}>
                    <Password
                      toggleMask
                      feedback={false}
                      name='password'
                      inputClassName={classes.input}
                      className='w-100'
                      value={userData.password}
                      onChange={handleChange}
                      placeholder='Nueva contraseña'
                    />
                  </Col>
                  <Col xs={12}>
                    <h6 className={classes.check}><CheckSquare/> al menos 8 caracteres</h6>
                    <h6>Mayuscula y minuscula</h6>
                    <h6>al menos un elemnto {`!#$%&/?¡`}</h6>
                  </Col>
                </Row>
                <Row className={classes.row}>
                  <Col xs={12}>
                    <Button className={classes.button} variant='secondary'>
                      Cambiar contraseña
                    </Button>
                  </Col>
                </Row>
              </Container>
            </section>
          </form>
        </Modal.Body>
      </Modal>
    </>
  )
}
