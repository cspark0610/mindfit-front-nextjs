// main tools
import { ChangeEvent, useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal, Spinner } from 'react-bootstrap'

// prime components
import { InputTextarea } from 'primereact/inputtextarea'
import { MultiSelect } from 'primereact/multiselect'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'

// components
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { UploadVideo } from 'components/atoms/UploadVideo'
import { microServices } from 'commons'

// gql
import GET_COACHING_AREAS from 'lib/queries/Coach/getCoachingAreas.gql'
import UPDATE_COACH from 'lib/mutations/Coach/updateCoach.gql'
import UPDATE_USER from 'lib/mutations/User/update.gql'
import { useMutation, useQuery } from '@apollo/client'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { MultiSelectChangeParams } from 'primereact/multiselect'
import { CoachDataType } from 'types/models/Coach'
import { UserDataType } from 'types/models/User'
import { Skeleton } from 'primereact/skeleton'
import { ChangeType } from 'types'
import { FC } from 'react'

type CoachProfileProps = {
  coach: CoachDataType
  content: any
}

export const CoachProfile: FC<CoachProfileProps> = ({ coach, content }) => {
  const [loading, setLoading] = useState(false)
  const [coachData, setCoachData] = useState(coach)
  const [coachingAreas, setCoachingAreas] = useState(undefined)
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
    await updateCoach({
      variables: {
        data: {
          coachingAreasId: updatecoachData.coachingAreas?.map(
            (item) => item.id
          ),
          picture: !updatecoachData.profilePicture?.location
            ? updatecoachData.profilePicture
            : undefined,
          phoneNumber: updatecoachData.phoneNumber,
          bio: updatecoachData.bio,
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
            <Col lg={6}>
              <h1 className={classes.title}>{content.userProfile.title}</h1>
              <UploadPicture
                data={coachData.profilePicture?.location}
                setData={setCoachData}
              />
              <h2 className={classes.subtitle}>
                {content.userProfile.bioInput.label}
              </h2>
              <InputTextarea
                rows={8}
                name='bio'
                value={coachData.bio}
                placeholder={content.userProfile.bioInput.placeholder}
                onChange={handleChangeCoach}
                className={classes.textarea}
              />
              <h2 className={classes.subtitle}>
                {content.userProfile.coachingAreasInput.label}
              </h2>
              {!coachingAreas ? (
                <Skeleton height='50px' width='100%' />
              ) : (
                <MultiSelect
                  display='chip'
                  optionLabel='name'
                  name='coachingAreas'
                  options={coachingAreas}
                  className={classes.input}
                  onChange={handleChangeCoach}
                  value={coachData.coachingAreas}
                  placeholder={
                    content.userProfile.coachingAreasInput.placeholder
                  }
                />
              )}
            </Col>
            <Col lg={6}>
              <h2 className={classes.subtitle}>
                {content.userProfile.nameInput.label}
              </h2>
              <InputText
                name='name'
                className={classes.input}
                onChange={handleChangeUser}
                value={coachData.user?.name}
                placeholder={content.userProfile.nameInput.placeholder}
              />
              <h2 className={classes.subtitle}>
                {content.userProfile.emailInput.label}
              </h2>
              <InputText
                disabled
                type='email'
                name='email'
                className={classes.input}
                value={coachData.user?.email}
                placeholder={content.userProfile.emailInput.placeholder}
              />
              <h2 className={classes.subtitle}>
                {content.userProfile.phoneInput.label}
              </h2>
              <InputMask
                name='phoneNumber'
                mask='+99 (999) 999-9999'
                className={classes.input}
                onChange={handleChangeCoach}
                value={coachData.phoneNumber}
                placeholder={content.userProfile.phoneInput.placeholder}
              />
              <h2 className={classes.subtitle}>
                {content.userProfile.videoInput.label}
              </h2>
              <UploadVideo
                data={coachData.profileVideo?.location}
                setData={setCoachData}
              />
              <p
                role='button'
                className={classes.recoveryLabel}
                onClick={() => setPasswordShow(true)}>
                {content.userProfile.changePasswordLabel}
              </p>
              <Button onClick={handleSave} className={classes.button}>
                {loading ? (
                  <Spinner animation='border' color='primary' />
                ) : (
                  content.userProfile.submitButton.label
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
