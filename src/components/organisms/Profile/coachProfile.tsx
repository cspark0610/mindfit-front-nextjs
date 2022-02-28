// main tools
import { ChangeEvent, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

// bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// gql
import { useMutation } from '@apollo/client'
import UPDATE_COACH from 'lib/mutations/Coach/updateCoach.gql'
import UPDATE_USER from 'lib/mutations/User/update.gql'

// utils
import {
  initialStateCoach,
  initialStateUser,
  saveData,
  validateCoachProfile,
} from 'utils/Profile/coachProfile'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { CoachDataType } from 'types/models/Coach'
import { UserDataType } from 'types/models/User'

export const CoachProfile: FC<{
  data: CoachDataType
}> = ({ data }) => {
  const [coachData, setCoachData] = useState<CoachDataType>(initialStateCoach(data))
  const [userData, setUserData] = useState<UserDataType>(initialStateUser(data.user))
  const [passwordShow, setPasswordShow] = useState(false)
  const [validate, setValidate] = useState(false)
  const [NewCoachData] = useMutation(UPDATE_COACH)
  const [NewUserData] = useMutation(UPDATE_USER)
  const session = useSession()

  const getValidate = () => setValidate(validateCoachProfile(coachData, userData))

  const handleChangeCoach = (
    ev: ChangeType | ChangeEvent<HTMLTextAreaElement>
  ) => setCoachData({ ...coachData, [ev.target.name]: ev.target.value })

  const handleChangeUser = (
    ev: ChangeType | ChangeEvent<HTMLTextAreaElement>
  ) => setUserData({ ...userData, [ev.target.name]: ev.target.value })


  const save = async () => {
    const { succes } = await saveData(session.data, coachData, userData, NewUserData, NewCoachData)
    if (succes) {
      setValidate(false)
    }
  }

  useEffect(() => {
    const coachData_str = JSON.stringify(coachData)
    const initial_str = JSON.stringify(initialStateCoach(data))
    if (coachData_str == initial_str) {
      setValidate(false)
    } else {
      getValidate()
    }
  }, [coachData])

  return (
    <>
      <section className={classes.container}>
        <h1 className={classes.title}>Perfil de usuario</h1>
        <UploadPicture setData={setCoachData} />
        <Container fluid>
          <Row className={classes.row}>
            <Col xs={12}>
              <InputText
                name='name'
                value={userData.name}
                onChange={handleChangeUser}
                placeholder='User name'
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
                name='videoPresentation'
                value={coachData.videoPresentation}
                onChange={handleChangeCoach}
                placeholder='video de Presentación'
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <InputTextarea
                rows={8}
                name='bio'
                value={coachData.bio}
                onChange={handleChangeCoach}
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
                <Button
                  className={classes.button}
                  onClick={() => save()}
                  disabled={!validate}>
                  Guardar
                </Button>
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
