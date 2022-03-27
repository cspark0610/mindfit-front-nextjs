import { UploadPicture } from 'components/atoms/UploadPicture'
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'
import { InputText } from 'primereact/inputtext'
import { FC, useState } from 'react'
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { CreditCard } from 'react-bootstrap-icons'
// styles
import classes from 'styles/Profile/profile.module.scss'
import { CoacheeDataType } from 'types/models/Coachee'
import { UserDataType } from 'types/models/User'
export const OrganizationProfile: FC<{
  coachee: CoacheeDataType
  content: any
}> = ({ coachee, content }) => {
  const [coacheeData, setCoacheeData] = useState(coachee)
  const [showPassword, setShowPassword] = useState(false)
  const [aboutTextArea, setAboutTextArea] = useState('')
  const [uploadUrl, setUploadUrl] = useState('')

  return (
    <>
      <Container className={classes.coachContainer}>
        <Container className={classes.section}>
          <Row>
            <Col lg={8}>
              <h1>Perfil de Organización</h1>
              <Row className={classes.organizationData}>
                <Col lg={4}>
                  <UploadPicture
                    setUploadUrl={setUploadUrl}
                    setData={setCoacheeData}
                  />
                </Col>
                <Col lg={6}>
                  <InputText
                    disabled
                    name='email'
                    value={coacheeData.user?.email}
                    className={classes.input}
                    placeholder={content.userProfile.emailInput.placeholder}
                  />
                  <p
                    role='button'
                    className={classes.recoveryPasswordLabel}
                    onClick={() => setShowPassword(true)}>
                    {content.userProfile.changePasswordButton.label}
                  </p>
                </Col>
              </Row>
              <Row className={classes.organizationAbout}>
                <Col lg={11}>
                  <h3>Acerca de</h3>
                  <textarea
                    className={classes.input}
                    value={aboutTextArea}
                    onChange={(e) => {
                      setAboutTextArea(e.target.value)
                    }}></textarea>
                </Col>
              </Row>
            </Col>
            <Col lg={4} className={classes.sideContent}>
              <h3>Subscripción</h3>
              <Row>
                <div className={classes.subscriptionCard}>
                  <h3>Básico</h3>
                  <span>$50</span>
                  <ul>
                    <li>Sesiones a cualquier hora</li>
                    <li>Coachs nuevos</li>
                    <li>Clases en vivo</li>
                  </ul>
                  <Button>Actualizar</Button>
                </div>
              </Row>
              <Row className={classes.paymentContainer}>
                <h3>Método de pago</h3>
                <div className={classes.paymentMethod}>
                  <CreditCard width={48} height={48} color='#045095' />
                  <p>Tarjeta de crédito</p>
                </div>
                <p
                  role='button'
                  className={classes.recoveryPasswordLabel}
                  onClick={() => setShowPassword(true)}>
                  {content.userProfile.changePasswordButton.label}
                </p>
              </Row>
              <Row className={classes.saveArea}>
                <Button>Guardar</Button>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
      <Modal
        centered
        show={showPassword}
        className={classes.modal}
        onHide={() => setShowPassword(false)}>
        <Modal.Header closeButton className={classes.close} />
        <Modal.Body>
          <ChangePasswordProfile
            onHide={setShowPassword}
            content={content.changePassword}
            user={coacheeData.user as UserDataType}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
