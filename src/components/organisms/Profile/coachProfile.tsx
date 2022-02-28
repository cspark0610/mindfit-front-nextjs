// main tools
import { ChangeEvent, useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

// components
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { microServices } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import UPDATE_COACH from 'lib/mutations/Coach/updateCoach.gql'
import UPDATE_USER from 'lib/mutations/User/update.gql'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { UserDataType } from 'types/models/User'
import { CoachDataType } from 'types/models/Coach'

type CoachProfileProps = {
  coach: CoachDataType
  content: any
}

export const CoachProfile: FC<CoachProfileProps> = ({ coach, content }) => {
  const [loading, setLoading] = useState(false)
  const [coachData, setCoachData] = useState(coach)
  const [passwordShow, setPasswordShow] = useState(false)

  const [updateUser] = useMutation(UPDATE_USER, {
    context: { ms: microServices.backend },
  })
  const [updateCoach] = useMutation(UPDATE_COACH, {
    context: { ms: microServices.backend },
  })

  const handleChangeUser = (ev: ChangeType) =>
    setCoachData({
      ...coachData,
      user: { ...coachData.user, [ev.target.name]: ev.target.value },
    })

  const handleChangeCoach = (
    ev: ChangeType | ChangeEvent<HTMLTextAreaElement>
  ) => setCoachData({ ...coachData, [ev.target.name]: ev.target.value })

  const handleSave = async () => {
    setLoading(true)
    const { user, ...updatecoachData } = coachData
    await updateUser({
      variables: {
        id: user?.sub,
        data: { name: user?.name, email: user?.email },
      },
    })
    await updateCoach({
      variables: {
        id: user?.coach?.id,
        data: {
          videoPresentation: updatecoachData.videoPresentation,
          bio: updatecoachData.bio,
        },
      },
    })
    setLoading(false)
  }

  return (
    <>
      <section className={classes.container}>
        <h1 className={classes.title}>{content.title}</h1>
        <UploadPicture setData={setCoachData} />
        <Container fluid>
          <Row className={classes.row}>
            <Col xs={12}>
              <InputText
                name='name'
                className={classes.input}
                onChange={handleChangeUser}
                value={coachData.user?.name}
                placeholder={content.userProfile.firstNameInput.placeholder}
              />
            </Col>
            <Col xs={12}>
              <InputText
                disabled
                name='email'
                className={classes.input}
                value={coachData.user?.email}
                placeholder={content.userProfile.emailInput.placeholder}
              />
            </Col>
            <Col xs={12}>
              <InputText
                name='videoPresentation'
                className={classes.input}
                onChange={handleChangeCoach}
                value={coachData.videoPresentation}
                placeholder='video de Presentación'
              />
            </Col>
            <Col xs={12}>
              <InputTextarea
                rows={8}
                name='bio'
                value={coachData.bio}
                placeholder='Biografía'
                onChange={handleChangeCoach}
                className={classes.textarea}
              />
            </Col>
            <Col xs={12}>
              <p
                className={classes.recoveryLabel}
                onClick={() => setPasswordShow(true)}>
                {content.userProfile.changePasswordButton.label}
              </p>
            </Col>
            <Row className='justify-content-end'>
              <Button onClick={handleSave} className={classes.button}>
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
      </section>
      <Modal
        centered
        show={passwordShow}
        className={classes.modal}
        onHide={() => setPasswordShow(false)}>
        <Modal.Header closeButton className={classes.close} />
        <Modal.Body className={classes.section_modal}>
          <ChangePasswordProfile
            onHide={setPasswordShow}
            content={content.changePassword}
            user={coachData.user as UserDataType}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
