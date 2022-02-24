// main tools
import { ChangeEvent, useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import { INITIAL_STATE } from 'utils/Profile/coachProfile'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { CoachDataType } from 'types/models/Coach'

export const CoachProfile: FC = () => {
  const [userData, setUserData] = useState<CoachDataType>(INITIAL_STATE)
  const [passwordShow, setPasswordShow] = useState(false)

  const handleChangeUser = (
    ev: ChangeType | ChangeEvent<HTMLTextAreaElement>
  ) => setUserData({ ...userData, [ev.target.name]: ev.target.value })

  return (
    <>
      <section className={classes.container}>
        <h1 className={classes.title}>Perfil de usuario</h1>
        <UploadPicture setData={setUserData} />
        <Container fluid>
          <Row className={classes.row}>
            <Col xs={12}>
              <InputText
                name='name'
                value={userData.user?.name}
                onChange={handleChangeUser}
                placeholder='User name'
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <InputText
                disabled
                name='email'
                value={userData.user?.email}
                placeholder='Email'
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <InputText
                name='videoPresentation'
                value={userData.videoPresentation}
                onChange={handleChangeUser}
                placeholder='video de Presentación'
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <InputTextarea
                rows={8}
                name='bio'
                value={userData.bio}
                onChange={handleChangeUser}
                placeholder='Biografía'
                className={classes.textarea}
              />
            </Col>
            <Col xs={12}>
              <p
                className={classes.recoveryLabel}
                onClick={() => setPasswordShow(true)}>
                Cambiar Contraseña
              </p>
            </Col>
            <Row className='justify-content-end'>
              <Col xs='auto'>
                <Button className={classes.button}>Guardar</Button>
              </Col>
            </Row>
          </Row>
          <ExploreBadge />
        </Container>
      </section>
      <Modal
        size='lg'
        centered
        className={classes.modal}
        show={passwordShow}
        onHide={() => setPasswordShow(false)}>
        <Modal.Header closeButton className={classes.close} />
        <Modal.Body className={classes.section_modal}>
          {/*<ChangePasswordProfile
            data={data}
            content={content}
            onHide={setPasswordShow}
          />*/}
        </Modal.Body>
      </Modal>
    </>
  )
}
