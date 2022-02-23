//main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col, Container, Modal, Row } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown'
import { Checkbox } from 'primereact/checkbox'

// utils
import { INITIAL_STATE } from 'utils/addColaborator'
import { workPositions } from 'components/organisms/ColaboratorSignup/utils'

//styles
import classes from 'styles/CoacheeManagent/coacheeManagent.module.scss'

//types
import { FC } from 'react'
import { ChangeType } from 'types'

export const CoacheeManagent: FC = () => {
  const [showModal, setShowModal] = useState(true)
  const [colaborator, setColaborator] = useState(INITIAL_STATE)
  const [rol, setRol] = useState(null)

  const handleChange = (ev: ChangeType | DropdownChangeParams) => {
    setColaborator({ ...colaborator, [ev.target.name]: ev.target.value })
  }

  const onRolChange = (value: any) => {
    if (rol === value) setRol(null)
    else setRol(value)
  }

  return (
    <Modal
      centered
      className={classes.modal}
      show={showModal}
      onHide={() => setShowModal(false)}
      size='lg'>
      <Modal.Header className={classes.close} closeButton />
      <Modal.Body className={classes.section_modal}>
        <form className={classes.container}>
          <h1 className={classes.title}>Agregar colaborador</h1>
          <Container fluid>
            <Row className={classes.row}>
              <Col xs={12}>
                <InputText
                  name='name'
                  value={colaborator.name}
                  onChange={handleChange}
                  placeholder='name'
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <InputText
                  name='email'
                  value={colaborator.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className={classes.input}
                />
              </Col>
              <Col xs={12}>
                <Dropdown
                  name='position'
                  options={workPositions}
                  className={classes.input}
                  onChange={handleChange}
                  value={colaborator.position}
                  placeholder='cargo o posición'
                />
              </Col>
            </Row>
            <Row xs='auto' className={classes.row}>
              <Checkbox
                inputId='admin'
                name='rol'
                value='admin'
                onChange={(e) => onRolChange(e.value)}
                checked={rol === 'admin'}
              />
              <label htmlFor='admin'>Admin</label>
              <Checkbox
                inputId='view'
                name='rol'
                value='view'
                onChange={(e) => onRolChange(e.value)}
                checked={rol === 'view'}
              />
              <label htmlFor='view'>Puede ver el dasboard</label>
            </Row>
            <Row className={classes.row}>
              <Col xs='auto'>
                <Button
                  type='submit'
                  className={classes.button}
                  variant='secondary'>
                  Agregar colaborador
                </Button>
              </Col>
            </Row>
          </Container>
        </form>
      </Modal.Body>
    </Modal>
  )
}
