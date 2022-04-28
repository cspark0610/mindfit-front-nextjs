// main tools
import { useState } from 'react'

// components
import { Icons } from '../Icons'

// bootstrap components
import { Button, Col, Spinner } from 'react-bootstrap'

// prime components
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'

// services
import { useCoacheeObjectives } from 'services/coachee'

// styles
import classes from 'styles/CoachObjectives/objectivesManagement.module.scss'

// type
import { FC } from 'react'
import { ChangeType } from 'types'
import { ObjectivesProps } from 'types/components/Objectives'

export const EditObjectives: FC<{
  goalData: ObjectivesProps
  show: (ev: boolean) => void
}> = ({ goalData, show }) => {
  const [showIcons, setShowIcons] = useState(false)
  const [loading, setLoading] = useState(false)
  const [goal, setGoal] = useState(goalData)

  const { updateObjective, deleteObjective } = useCoacheeObjectives()

  const handleChange = (ev: ChangeType) => {
    setGoal({ ...goal, [ev.target.id]: ev.target.value })
  }

  const handleChangeIcon = (ev: string) => {
    setGoal({ ...goal, icon: ev })
    setShowIcons(false)
  }

  const handleEditGoal = async () => {
    setLoading(true)
    await updateObjective({
      variables: { data: { title: goal.title, icon: goal.icon }, id: goal.id },
    })
    setLoading(false)
    show(false)
  }

  const handleDeleteGoal = async () => {
    setLoading(true)
    await deleteObjective({ variables: { id: goal.id } })
    setLoading(false)
    show(false)
  }

  return (
    <>
      <h2 className={`text-center ${classes.subtitle}`}>Editar un objetivo</h2>
      <Button
        variant='light'
        onClick={() => setShowIcons(true)}
        className={`my-3 ${classes.button}`}>
        <Col className={classes.icon}>
          <i className={`fs-4 ${goal.icon}`} />
        </Col>
        Cambiar icono
      </Button>
      <Dialog
        appendTo='self'
        visible={showIcons}
        className={classes.dialog}
        onHide={() => setShowIcons(false)}>
        <Icons handleClickIcon={handleChangeIcon} />
      </Dialog>
      <Col className='my-3'>
        <label htmlFor='title' className={`fw-bold ${classes.subtitle}`}>
          Título
        </label>
        <InputText
          id='title'
          value={goal.title}
          className={classes.input}
          onChange={(ev) => handleChange(ev)}
        />
      </Col>
      <Col className='text-end'>
        <Button className='me-3' variant='danger' onClick={handleDeleteGoal}>
          {!loading ? 'Eliminar' : <Spinner animation='border' />}
        </Button>
        <Button onClick={handleEditGoal}>
          {!loading ? 'Guardar' : <Spinner animation='border' />}
        </Button>
      </Col>
    </>
  )
}
