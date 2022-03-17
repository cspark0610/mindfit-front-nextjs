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
import { microServices, regexValidation } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import INVITE_COACHEE from 'lib/mutations/Coachees/inviteCoachee.gql'

// utils
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'
import { INITIAL_STATE, validateCoachee } from 'utils/inviteCoachee'

//styles
import classes from 'styles/CoacheeManagement/coacheeManagement.module.scss'

//types
import { FC } from 'react'
import { ChangeType } from 'types'

export const InviteCoachee: FC<ModalProps> = ({ refetch, ...props }) => {
  const [coacheeData, setCoacheeData] = useState(INITIAL_STATE)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const validate = validateCoachee(coacheeData)

  const [inviteCoachee] = useMutation(INVITE_COACHEE, {
    context: { ms: microServices.backend },
  })

  const onRolChange = (ev: CheckboxChangeParams) => {
    if (ev.value == 'isActive') {
      coacheeData['isAdmin'] = false
      coacheeData['canViewDashboard'] = false
    } else if (ev.value == 'isAdmin') {
      coacheeData['canViewDashboard'] = false
    } else if (ev.value == 'canViewDashboard') {
      coacheeData['isAdmin'] = false
    }
    setCoacheeData({ ...coacheeData, [ev.value]: ev.checked })
  }

  const handleCoacheeChange = (ev: DropdownChangeParams) => {
    setCoacheeData({ ...coacheeData, [ev.target.name]: ev.target.value })
  }
  const handleUserChange = (ev: ChangeType) => {
    error && setError('')
    setCoacheeData({
      ...coacheeData,
      user: { ...coacheeData.user, [ev.target.name]: ev.target.value },
    })
  }

  const handleSave = async () => {
    const EmailValidate = regexValidation(coacheeData.user?.email)
    if (EmailValidate.isEmail) {
      setLoading(true)
      await inviteCoachee({
        variables: {
          data: coacheeData,
        },
        onError: () => setError('ha ocurrido un error intente nuevamente'),
      })
      setLoading(false)
      refetch()
    } else setError('ingrese un correo electronico valido')
  }

  return (
    <Modal centered className={classes.modal} {...props} size='lg'>
      <Modal.Header className={classes.close} closeButton />
      <Modal.Body className={classes.section_modal}>
        <section className={classes.container}>
          <h1 className={`fs-4 ${classes.title}`}>Invitar o añadir coachee</h1>
          <Container fluid>
            <Row className={classes.row}>
              <Col xs={12}>
                <h5 className={classes.inputText}>Nombre y apellido</h5>
                <InputText
                  name='name'
                  value={coacheeData.user?.name}
                  onChange={handleUserChange}
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <h5 className={classes.inputText}>Email</h5>
                <InputText
                  name='email'
                  value={coacheeData.user?.email}
                  onChange={handleUserChange}
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <h5 className={classes.inputText}>Cargo</h5>
                <Dropdown
                  appendTo='self'
                  name='position'
                  options={workPositions}
                  onChange={handleCoacheeChange}
                  className={classes.input}
                  value={coacheeData.position}
                  placeholder='Cargo o posición'
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
              {error && <p className='p-error text-center'>{error}</p>}
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
