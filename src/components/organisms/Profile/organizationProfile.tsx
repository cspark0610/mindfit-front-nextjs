// main tools
import { useState } from 'react'

// components
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'
import { UploadPicture } from 'components/atoms/UploadPicture'

// prime components
import { InputTextarea } from 'primereact/inputtextarea'

// bootstrap components
import {
  Button,
  Col,
  Container,
  Modal,
  ProgressBar,
  Row,
  Spinner,
} from 'react-bootstrap'
import { CreditCard } from 'react-bootstrap-icons'

// gql
import UPDATE_ORGANIZATION from 'lib/mutations/Organization/update.gql'
import { useMutation } from '@apollo/client'

// utils
import { uploadFilesService } from 'utils/uploadFilesService'
import { microServices } from 'commons'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { OrganizationDataType } from 'types/models/Organization'
import { fileDataType } from 'types/models/Files'
import { UserDataType } from 'types/models/User'
import { ChangeEvent, FC } from 'react'
import { ChangeType } from 'types'

export const OrganizationProfile: FC<{
  organization: OrganizationDataType
  content: any
}> = ({ organization, content }) => {
  const [organizationData, setOrganizationData] = useState(organization)
  const [uploadPictureProgress, setUploadPictureProgress] = useState(0)
  const [uploadPictureUrl, setUploadPictureUrl] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const [updateOrg] = useMutation(UPDATE_ORGANIZATION, {
    context: { ms: microServices.backend },
  })

  const handleChange = (ev: ChangeType | ChangeEvent<HTMLTextAreaElement>) =>
    setOrganizationData({
      ...organizationData,
      [ev.target.name]: ev.target.value,
    })

  const handleSubmit = async () => {
    setLoading(true)

    if (uploadPictureUrl !== '') {
      const formData = new FormData()
      formData.append('file', organizationData.profilePicture as File)
      await uploadFilesService(
        uploadPictureUrl,
        formData,
        setUploadPictureProgress
      )
    }

    await updateOrg({
      variables: {
        id: organizationData.id,
        data: {
          about: organizationData.about,
          picture: (organizationData.profilePicture as File)?.type
            ? {
                key: (organizationData.profilePicture as File).name,
                type: (organizationData.profilePicture as File).type,
              }
            : undefined,
        },
      },
    })
    setLoading(false)
  }

  return (
    <>
      <Container className={classes.coachContainer}>
        <Container className={classes.section}>
          <Row>
            <Col lg={8}>
              <h1 className={`${classes.title} text-start`}>
                {content.orgProfile.title}:{' '}
                <strong>{organizationData.name}</strong>
              </h1>
              <Row className={classes.organizationData}>
                <Col lg={4}>
                  <UploadPicture
                    setUploadUrl={setUploadPictureUrl}
                    setData={setOrganizationData}
                    data={
                      (organizationData.profilePicture as fileDataType)
                        ?.location
                    }
                  />
                  {uploadPictureProgress !== 0 && (
                    <ProgressBar
                      animated
                      now={uploadPictureProgress}
                      label={`${uploadPictureProgress}%`}
                    />
                  )}
                </Col>
                <Col lg={6}>
                  <span className={`py-3 ${classes.input}`}>
                    {organization.owner?.email}
                  </span>
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
                  <InputTextarea
                    name='about'
                    onChange={handleChange}
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
              <Button onClick={handleSubmit} className={classes.button}>
                {loading ? (
                  <Spinner animation='border' />
                ) : (
                  content.orgProfile.submitButton.label
                )}
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
