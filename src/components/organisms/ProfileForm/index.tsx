// main tools
import { useEffect, useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { ChangePasswordProfile } from 'components/molecules/ChangePasswordProfile'

//gql
import { useMutation } from '@apollo/client'
import USER_DATA from 'lib/mutations/User/userProfile.gql'

// utils
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'
import { initialState, saveData, validateUserProfile } from 'utils/userProfile'

// styles
import classes from 'styles/UserProfile/userProfile.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { UserDataType } from 'types/models/User'

export const ProfileForm: FC<{
  data: UserDataType
  content: any
}> = ({ data, content }) => {
  const [userData, setUserData] = useState<UserDataType>(initialState(data))
  const [passwordShow, setPasswordShow] = useState(false)
  const [validate, setValidate] = useState(false)
  const [NewData] = useMutation(USER_DATA)

  const handleChangeUser = (ev: ChangeType | DropdownChangeParams) =>
    setUserData({ ...userData, [ev.target.name]: ev.target.value })

  const getValidate = () => setValidate(validateUserProfile(userData))

  const save = async () => {
    const { succes } = await saveData(data, userData, NewData)
    if (succes) {
      setValidate(false)
    }
  }

  useEffect(() => {
    const userData_str = JSON.stringify(userData)
    const initial_str = JSON.stringify(initialState(data))
    if (userData_str == initial_str) {
      setValidate(false)
    } else {
      getValidate()
    }
  }, [userData])

  return (
    <>
      <section className={classes.container}>
        <h1 className={classes.title}>{content.title}</h1>
        <UploadPicture setData={setUserData} />
        <Container fluid>
          <Row className={classes.row}>
            <Col xs={12}>
              <InputText
                name='name'
                value={userData.name}
                onChange={handleChangeUser}
                placeholder={content.firstNameInput.placeholder}
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <InputText
                disabled
                name='email'
                value={userData.email}
                placeholder={content.emailInput.placeholder}
                className={classes.input}
              />
            </Col>
            <Col xs={12}>
              <Dropdown
                name='position'
                options={workPositions}
                onChange={handleChangeUser}
                className={classes.input}
                value={userData.coachee?.position}
                placeholder={content.positionInput.placeholder}
              />
            </Col>
            <Col xs={12}>
              <p
                className={classes.recoveryLabel}
                onClick={() => setPasswordShow(true)}>
                {content.changePasswordButton.label}
              </p>
            </Col>
            <Col xs='auto' className={classes.rigth}>
              <Button onClick={() => save()} disabled={!validate}>
                {content.saveButton.label}
              </Button>
            </Col>
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
          <ChangePasswordProfile
            data={data}
            content={content}
            onHide={setPasswordShow}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
