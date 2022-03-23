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
import { microServices, regexValidation } from 'commons'

// gql
import { useMutation } from '@apollo/client'
import INVITE_COACHEE from 'lib/mutations/Coachee/inviteCoachee.gql'

// utils
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'
import { INITIAL_STATE, validateCoachee } from 'utils/inviteCoachee'

//styles
import classes from 'styles/CoacheeManagement/coacheeManagement.module.scss'

//types
import { FC } from 'react'
import { ChangeType } from 'types'

export const InviteCoachee: FC<ModalProps> = ({
  content,
  coacheeForm,
  refetch,
  ...props
}) => {
  const [coacheeData, setCoacheeData] = useState(INITIAL_STATE)
  const [rol, setRol] = useState('isActive')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const validate = validateCoachee(coacheeData)

  const [inviteCoachee] = useMutation(INVITE_COACHEE, {
    context: { ms: microServices.backend },
  })

  const rolOptions = [
    { name: coacheeForm.activeCheckLabel, value: 'isActive' },
    { name: coacheeForm.adminCheckLabel, value: 'isAdmin' },
    { name: coacheeForm.canViewCheckLabel, value: 'canViewDashboard' },
  ]

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
          data: {
            ...coacheeData,
            isAdmin: rol === 'isAdmin',
            canViewDashboard: rol === 'canViewDashboard',
          },
        },
        onError: () => setError(content.errorMessage),
      })
      setLoading(false)
      refetch()
    } else setError(content.invalidEmailMessage)
  }

  return (
    <Modal centered className={classes.modal} {...props} size='lg'>
      <Modal.Header className={classes.close} closeButton />
      <Modal.Body className={classes.section_modal}>
        <section className={classes.container}>
          <h1 className={`fs-4 ${classes.title}`}>
            {content.inviteCoacheeTitle}
          </h1>
          <Container fluid>
            <Row className={classes.row}>
              <Col xs={12}>
                <h5 className={classes.inputText}>
                  {coacheeForm.nameInput.label}
                </h5>
                <InputText
                  name='name'
                  value={coacheeData.user?.name}
                  onChange={handleUserChange}
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <h5 className={classes.inputText}>
                  {coacheeForm.emailInput.label}
                </h5>
                <InputText
                  name='email'
                  value={coacheeData.user?.email}
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
                  onChange={handleCoacheeChange}
                  className={classes.input}
                  value={coacheeData.position}
                />
              </Col>
            </Row>
            <SelectButton
              value={rol}
              options={rolOptions}
              optionLabel='name'
              onChange={(ev) => setRol(ev.value)}
              className={classes.button_select}
              unselectable={false}
            />
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
