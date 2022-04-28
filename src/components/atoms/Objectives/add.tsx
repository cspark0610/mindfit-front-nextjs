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

export const AddObjectives: FC<{ show: (ev: boolean) => void }> = ({
  show,
}) => {
  const [goal, setGoal] = useState({ title: '', icon: '' })
  const [showIcons, setShowIcons] = useState(false)
  const [loading, setLoading] = useState(false)

  const { addObjective } = useCoacheeObjectives()

  const handleChange = (ev: ChangeType) => {
    setGoal({ ...goal, [ev.target.id]: ev.target.value })
  }

  const handleChangeIcon = (ev: string) => {
    setGoal({ ...goal, icon: ev })
    setShowIcons(false)
  }

  const handleAddGoal = async () => {
    setLoading(true)
    await addObjective({ variables: { data: goal } })
    setLoading(false)
    show(false)
  }

  return (
    <>
      <h2 className={`text-center ${classes.subtitle}`}>Crear un objetivo</h2>
      <Button
        variant='light'
        onClick={() => setShowIcons(true)}
        className={`my-3 ${classes.button}`}>
        <Col className={classes.icon}>
          <i className={`fs-4 ${goal.icon}`} />
        </Col>
        Agregar un icono
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
        <Button
          onClick={handleAddGoal}
          disabled={!goal.icon || !goal.title ? true : false}>
          {!loading ? 'Guardar' : <Spinner animation='border' />}
        </Button>
      </Col>
    </>
  )
}
