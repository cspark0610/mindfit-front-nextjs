// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'

//gql
import { useMutation } from '@apollo/client'
import UPDATE_USER from 'lib/mutations/User/update.gql'
import UPDATE_COACHEE from 'lib/mutations/Coachees/update.gql'

// utils
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'
import { validateCoacheeProfile } from 'utils/Profile/coacheeProfile'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { microServices } from 'commons'
import { UserDataType } from 'types/models/User'
import { CoacheeDataType } from 'types/models/Coachee'

export const CoacheeProfile: FC<{ coachee: CoacheeDataType; content: any }> = ({
  coachee,
  content,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [coacheeData, setCoacheeData] = useState(coachee)
  const [loading, setLoading] = useState(false)
  const validate = validateCoacheeProfile(coacheeData)

  const [updateUser] = useMutation(UPDATE_USER, {
    context: { ms: microServices.backend },
  })
  const [updateCoachee] = useMutation(UPDATE_COACHEE, {
    context: { ms: microServices.backend },
  })

  const handleCoacheeChange = (ev: DropdownChangeParams) =>
    setCoacheeData({ ...coacheeData, [ev.target.name]: ev.target.value })

  const handleUserChange = (ev: ChangeType) =>
    setCoacheeData({
      ...coacheeData,
      user: { ...coacheeData.user, [ev.target.name]: ev.target.value },
    })

  const handleSave = async () => {
    setLoading(true)
    const { user, ...updatecoacheeData } = coacheeData
    await updateUser({
      variables: {
        id: user?.sub,
        data: { name: user?.name, email: user?.email },
      },
    })
    await updateCoachee({
      variables: {
        coacheeId: user?.coachee?.id,
        data: { position: updatecoacheeData.position },
      },
    })
    setLoading(false)
  }

  return (
    <>
      <Container className={classes.container}>
        <Container className={classes.section}>
          <h1 className={classes.title}>{content.userProfile.title}</h1>
          <UploadPicture setData={setCoacheeData} />
          <Container fluid>
            <Row className={classes.row}>
              <Col xs={12}>
                <InputText
                  name='name'
                  value={coacheeData.user?.name}
                  className={classes.input}
                  onChange={handleUserChange}
                  placeholder={content.userProfile.firstNameInput.placeholder}
                />
              </Col>
              <Col xs={12}>
                <InputText
                  disabled
                  name='email'
                  value={coacheeData.user?.email}
                  className={classes.input}
                  placeholder={content.userProfile.emailInput.placeholder}
                />
              </Col>
              <Col xs={12}>
                <Dropdown
                  name='position'
                  options={workPositions}
                  className={classes.input}
                  value={coacheeData.position}
                  onChange={handleCoacheeChange}
                  placeholder={content.userProfile.positionInput.placeholder}
                />
              </Col>
              <Col xs={12}>
                <p
                  role='button'
                  className={classes.recoveryLabel}
                  onClick={() => setShowPassword(true)}>
                  {content.userProfile.changePasswordButton.label}
                </p>
              </Col>
              <Row className='justify-content-end'>
                <Button
                  disabled={!validate}
                  onClick={handleSave}
                  className={classes.button}>
                  {loading ? (
                    <Spinner animation='border' color='primary' />
                  ) : (
                    content.userProfile.saveButton.label
                  )}
                </Button>
              </Row>
            </Row>
            <ExploreBadge />
          </Container>
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
