// main tools
import { FC, useState } from 'react'

// components
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'
import { UploadPicture } from 'components/atoms/UploadPicture'

// prime components
import { InputText } from 'primereact/inputtext'

// bootstrap components
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'
import { CreditCard } from 'react-bootstrap-icons'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { OrganizationDataType } from 'types/models/Organization'
import { fileDataType } from 'types/models/Files'
import { UserDataType } from 'types/models/User'

export const OrganizationProfile: FC<{
  organization: OrganizationDataType
  content: any
}> = ({ organization, content }) => {
  const [organizationData, setOrganizationData] = useState(organization)
  const [showPassword, setShowPassword] = useState(false)
  const [uploadUrl, setUploadUrl] = useState('')

  return (
    <>
      <Container className={classes.coachContainer}>
        <Container className={classes.section}>
          <Row>
            <Col lg={8}>
              <h1 className={`${classes.title} text-start`}>
                {content.orgProfile.title}
              </h1>
              <Row className={classes.organizationData}>
                <Col lg={4}>
                  <UploadPicture
                    setUploadUrl={setUploadUrl}
                    setData={setOrganizationData}
                    data={
                      (organizationData.profilePicture as fileDataType).location
                    }
                  />
                </Col>
                <Col lg={6}>
                  <InputText
                    disabled
                    name='email'
                    className={classes.input}
                    value={organization.owner?.email}
                  />
                  <p
                    role='button'
                    onClick={() => setShowPassword(true)}
                    className={classes.recoveryPasswordLabel}>
                    {content.orgProfile.changePasswordLabel}
                  </p>
                </Col>
              </Row>
              <Row className={classes.organizationAbout}>
                <Col lg={11}>
                  <h3 className={`${classes.title} text-start`}>
                    {content.orgProfile.aboutLabel}
                  </h3>
                  <textarea
                    className={classes.input}
                    value={organizationData.about}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={4} className={classes.sideContent}>
              <h3 className={`${classes.title} text-start`}>
                {content.orgProfile.subscriptionLabel}
              </h3>
              <Row>
                <div className={classes.subscriptionCard}>
                  <h3>Básico</h3>
                  <span>$50</span>
                  <ul>
                    <li>Sesiones a cualquier hora</li>
                    <li>Coaches nuevos</li>
                    <li>Clases en vivo</li>
                  </ul>
                  <Button>Actualizar</Button>
                </div>
              </Row>
              <Row className={classes.paymentContainer}>
                <h3 className={`${classes.title} text-start`}>
                  {content.orgProfile.paymentMethodLabel}
                </h3>
                <div className={classes.paymentMethod}>
                  <CreditCard width={48} height={48} color='#045095' />
                  <p>Tarjeta de crédito</p>
                </div>
                <p
                  role='button'
                  onClick={() => setShowPassword(true)}
                  className={classes.recoveryPasswordLabel}>
                  {content.orgProfile.changePasswordLabel}
                </p>
              </Row>
              <Button className={classes.button}>
                {content.orgProfile.submitButton.label}
              </Button>
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
            user={organization.owner as UserDataType}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
