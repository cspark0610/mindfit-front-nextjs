// main tools
import { ChangeEvent, useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'

// components
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { microServices } from 'commons'

// gql
import { useMutation, useQuery } from '@apollo/client'
import UPDATE_COACH from 'lib/mutations/Coach/updateCoach.gql'
import UPDATE_USER from 'lib/mutations/User/update.gql'
import GET_COACHING_AREAS from 'lib/queries/Coach/getCoachingAreas.gql'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { UserDataType } from 'types/models/User'
import { CoachDataType } from 'types/models/Coach'
import { MultiSelectChangeParams } from 'primereact/multiselect'

type CoachProfileProps = {
  coach: CoachDataType
  content: any
}

export const CoachProfile: FC<CoachProfileProps> = ({ coach, content }) => {
  const [loading, setLoading] = useState(false)
  const [coachData, setCoachData] = useState(coach)
  const [coachingAreas, setCoachingAreas] = useState([])
  const [passwordShow, setPasswordShow] = useState(false)

  const [updateUser] = useMutation(UPDATE_USER, {
    context: { ms: microServices.backend },
    onCompleted: (user) => console.log({ user }),
    onError: (error) => console.log({ error }),
  })
  const [updateCoach] = useMutation(UPDATE_COACH, {
    context: { ms: microServices.backend },
    onCompleted: (coach) => console.log({ coach }),
    onError: (error) => console.log({ error }),
  })
  useQuery(GET_COACHING_AREAS, {
    context: { ms: microServices.backend },
    onCompleted: (data) => setCoachingAreas(data.findAllCoachingAreas),
  })

  const handleChangeUser = (ev: ChangeType) =>
    setCoachData({
      ...coachData,
      user: { ...coachData.user, [ev.target.name]: ev.target.value },
    })

  const handleChangeCoach = (
    ev: ChangeType | ChangeEvent<HTMLTextAreaElement> | MultiSelectChangeParams
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
    const res = await updateCoach({
      variables: {
        id: user?.coach?.id,
        data: {
          videoPresentation: updatecoachData.videoPresentation,
          coachingAreasId: updatecoachData.coachingAreas,
          phoneNumber: updatecoachData.phoneNumber,
          bio: updatecoachData.bio,
        },
      },
    })

    console.log(res)
    setLoading(false)
  }

  return (
    <>
      <Container className={classes.coachContainer}>
        <Container className={classes.section}>
          <Row>
            <Col lg={6}>
              <h1 className={classes.title}>Perfil de coach</h1>
              <UploadPicture setData={setCoachData} />
              <h2 className={classes.subtitle}>Biografía</h2>
              <InputTextarea
                rows={8}
                name='bio'
                value={coachData.bio}
                placeholder='Biografía'
                onChange={handleChangeCoach}
                className={classes.textarea}
              />
              <h2 className={classes.subtitle}>Áreas de coaching</h2>
              <MultiSelect
                display='chip'
                optionValue='id'
                optionLabel='name'
                name='coachingAreas'
                options={coachingAreas}
                className={classes.input}
                onChange={handleChangeCoach}
                value={coachData.coachingAreas}
                placeholder='Escoge las areas de coaching'
              />
            </Col>
            <Col lg={6}>
              <h2 className={classes.subtitle}>Nombre</h2>
              <InputText
                name='name'
                className={classes.input}
                onChange={handleChangeUser}
                value={coachData.user?.name}
                placeholder={content.userProfile.firstNameInput.placeholder}
              />
              <h2 className={classes.subtitle}>Email</h2>
              <InputText
                disabled
                type='email'
                name='email'
                className={classes.input}
                value={coachData.user?.email}
                placeholder={content.userProfile.emailInput.placeholder}
              />
              <h2 className={classes.subtitle}>Teléfono</h2>
              <InputMask
                name='phoneNumber'
                mask='+99 (999) 999-9999'
                className={classes.input}
                onChange={handleChangeCoach}
                value={coachData.phoneNumber}
                placeholder='Numero de celular'
              />
              <h2 className={classes.subtitle}>Video</h2>
              <InputText
                type='url'
                name='videoPresentation'
                className={classes.input}
                onChange={handleChangeCoach}
                value={coachData.videoPresentation}
                placeholder='video de Presentación'
              />
              <p
                role='button'
                className={classes.recoveryLabel}
                onClick={() => setPasswordShow(true)}>
                {content.userProfile.changePasswordButton.label}
              </p>
              <Button onClick={handleSave} className={classes.button}>
                {loading ? (
                  <Spinner animation='border' color='primary' />
                ) : (
                  content.userProfile.saveButton.label
                )}
              </Button>
            </Col>
          </Row>
          <ExploreBadge />
        </Container>
      </Container>

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
