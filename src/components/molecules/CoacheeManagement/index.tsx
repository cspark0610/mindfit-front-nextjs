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
import { Checkbox, CheckboxChangeParams } from 'primereact/checkbox'

// commons
import { microServices } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import UPDATE_USER from 'lib/mutations/User/update.gql'
import UPDATE_COACHEE from 'lib/mutations/Coachees/update.gql'

// utils
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'
import { validateCoacheeProfile } from 'utils/Profile/coacheeProfile'

//styles
import classes from 'styles/CoacheeManagement/coacheeManagement.module.scss'

//types
import { FC } from 'react'
import { ChangeType } from 'types'
import { CoacheeDataType } from 'types/models/Coachee'

export const CoacheeManagement: FC<ModalProps> = ({
  data,
  refetch,
  ...props
}) => {
  const [coacheeData, setCoacheeData] = useState<CoacheeDataType>(data)
  const [loading, setLoading] = useState(false)
  const validate = validateCoacheeProfile(coacheeData)

  const [updateUser] = useMutation(UPDATE_USER, {
    context: { ms: microServices.backend },
  })
  const [updateCoachee] = useMutation(UPDATE_COACHEE, {
    context: { ms: microServices.backend },
  })

  const roles: any = {
    isAdmin: coacheeData.isAdmin,
    canViewDashboard: coacheeData.canViewDashboard,
    isActive: coacheeData.isActive,
  }

  const onRolChange = (ev: CheckboxChangeParams) => {
    if (ev.value == 'isActive') {
      roles['canViewDashboard'] = false
      roles['isAdmin'] = false
    } else if (ev.value == 'isAdmin') roles['canViewDashboard'] = false
    else if (ev.value == 'canViewDashboard') roles['isAdmin'] = false

    roles[ev.value] = ev.checked
    setCoacheeData({ ...coacheeData, ...roles })
  }

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
          isAdmin: updatecoacheeData.isAdmin,
          canViewDashboard: updatecoacheeData.canViewDashboard,
        },
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
          <h1 className={`fs-4 ${classes.title}`}>Editar coachee</h1>
          <Container fluid>
            <Row className={classes.row}>
              <Col xs={12}>
                <h5 className={classes.inputText}>Nombre y apellido</h5>
                <InputText
                  id='name'
                  name='name'
                  value={coacheeData.user?.name}
                  onChange={handleUserChange}
                  placeholder='name'
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <h5 className={classes.inputText}>Cargo</h5>
                <Dropdown
                  appendTo='self'
                  name='position'
                  options={workPositions}
                  className={classes.input}
                  onChange={handleCoacheeChange}
                  value={coacheeData.position}
                  placeholder='cargo o posición'
                />
              </Col>
            </Row>
            <Row xs='auto' className={classes.row}>
              <Checkbox
                inputId='isActive'
                name='rol'
                value='isActive'
                onChange={(e) => onRolChange(e)}
                checked={!coacheeData.isAdmin && !coacheeData.canViewDashboard}
              />
              <label htmlFor='isActive'>Activo</label>
              <Checkbox
                inputId='isAdmin'
                name='rol'
                value='isAdmin'
                onChange={(e) => onRolChange(e)}
                checked={coacheeData.isAdmin}
              />
              <label htmlFor='admin'>Admin</label>
              <Checkbox
                inputId='canViewDashboard'
                name='rol'
                value='canViewDashboard'
                onChange={(e) => onRolChange(e)}
                checked={coacheeData.canViewDashboard && !coacheeData.isAdmin}
              />
              <label htmlFor='canViewDashboard'>Puede ver el dasboard</label>
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
                    'Guardar'
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
