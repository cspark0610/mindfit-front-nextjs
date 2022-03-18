//main tools
import { useState } from 'react'

// bootstrap components
import {
  Button,
  Col,
  Container,
  Modal,
  ModalProps,
  Row,
  Spinner,
} from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { SelectButton } from 'primereact/selectbutton'

// commons
import { microServices } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import UPDATE_USER from 'lib/mutations/User/update.gql'
import UPDATE_COACHEE from 'lib/mutations/Coachee/update.gql'
import SUSPEND_OR_ACTIVATE from 'lib/mutations/coachee/suspendOrActivate.gql'

// utils
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'
import { validateCoachee } from 'utils/inviteCoachee'

//styles
import classes from 'styles/CoacheeManagement/coacheeManagement.module.scss'

//types
import { FC } from 'react'
import { ChangeType } from 'types'
import { CoacheeDataType } from 'types/models/Coachee'

export const CoacheeManagement: FC<ModalProps> = ({
  data,
  content,
  coacheeForm,
  refetch,
  ...props
}) => {
  const [coacheeData, setCoacheeData] = useState<CoacheeDataType>(data)
  const [rol, setRol] = useState(
    coacheeData.isAdmin
      ? 'isAdmin'
      : coacheeData.canViewDashboard
      ? 'canViewDashboard'
      : coacheeData.isActive
      ? 'isActive'
      : 'isSuspend'
  )
  const [loading, setLoading] = useState(false)
  const validate = validateCoachee(coacheeData)
  const rolOptions = [
    { name: coacheeForm.activeCheckLabel, value: 'isActive' },
    { name: coacheeForm.suspendCheckLabel, value: 'isSuspend' },
    { name: coacheeForm.adminCheckLabel, value: 'isAdmin' },
    { name: coacheeForm.canViewCheckLabel, value: 'canViewDashboard' },
  ]

  const [updateUser] = useMutation(UPDATE_USER, {
    context: { ms: microServices.backend },
  })
  const [updateCoachee] = useMutation(UPDATE_COACHEE, {
    context: { ms: microServices.backend },
  })
  const [suspendCoachee] = useMutation(SUSPEND_OR_ACTIVATE, {
    context: { ms: microServices.backend },
  })

  const handleCoacheeChange = (ev: DropdownChangeParams) => {
    setCoacheeData({ ...coacheeData, [ev.target.name]: ev.target.value })
  }
  const handleUserChange = (ev: ChangeType) => {
    setCoacheeData({
      ...coacheeData,
      user: { ...coacheeData.user, [ev.target.name]: ev.target.value },
    })
  }

  const handleSave = async () => {
    const { user, ...updatecoacheeData } = coacheeData
    setLoading(true)
    await updateUser({
      variables: {
        id: user?.id,
        data: { name: user?.name },
      },
    })
    await updateCoachee({
      variables: {
        coacheeId: updatecoacheeData.id,
        data: {
          position: updatecoacheeData.position,
          isAdmin: rol === 'isAdmin',
          canViewDashboard: rol === 'canViewDashboard',
        },
      },
    })
    await suspendCoachee({
      variables: {
        coacheeId: updatecoacheeData.id,
        type: rol === 'isActive' ? 'ACTIVATE' : 'SUSPEND',
      },
    })
    setLoading(false)
    refetch()
  }

  return (
    <Modal centered className={classes.modal} {...props} size='lg'>
      <Modal.Header className={classes.close} closeButton />
      <Modal.Body className={classes.section_modal}>
        <section className={classes.container}>
          <h1 className={`fs-4 ${classes.title}`}>{content.editCoaheeTitle}</h1>
          <Container fluid>
            <Row className={classes.row}>
              <Col xs={12}>
                <h5 className={classes.inputText}>
                  {coacheeForm.nameInput.label}
                </h5>
                <InputText
                  id='name'
                  name='name'
                  value={coacheeData.user?.name}
                  onChange={handleUserChange}
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <h5 className={classes.inputText}>
                  {coacheeForm.positionInput.label}
                </h5>
                <Dropdown
                  appendTo='self'
                  name='position'
                  options={workPositions}
                  className={classes.input}
                  onChange={handleCoacheeChange}
                  value={coacheeData.position}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <SelectButton
                  value={rol}
                  options={rolOptions}
                  optionLabel='name'
                  onChange={(ev) => setRol(ev.value)}
                  className={classes.button_select}
                  unselectable={false}
                />
              </Col>
            </Row>
            <Row className={`justify-content-end ${classes.row}`}>
              <Col xs='auto'>
                <Button
                  disabled={!validate}
                  className={classes.button}
                  onClick={handleSave}>
                  {loading ? (
                    <Spinner animation='border' color='primary' />
                  ) : (
                    coacheeForm.saveButton.label
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </section>
      </Modal.Body>
    </Modal>
  )
}
