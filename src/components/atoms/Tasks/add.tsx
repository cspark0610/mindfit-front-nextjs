// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col, Spinner } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'

// services
import { useCoacheeObjectives } from 'services/coachee'

// styles
import classes from 'styles/CoachObjectives/objectivesManagement.module.scss'

// type
import { FC } from 'react'
import { ChangeType } from 'types'

export const AddTasks: FC<{ goalId: number; show: (ev: boolean) => void }> = ({
  goalId,
  show,
}) => {
  const [task, setTask] = useState({ title: '', coacheeObjectiveId: goalId })
  const [loading, setLoading] = useState(false)
  const { addTask } = useCoacheeObjectives()

  const handleChange = (ev: ChangeType) => {
    setTask({ ...task, [ev.target.id]: ev.target.value })
  }

  const handleAddTask = async () => {
    setLoading(true)
    await addTask({ variables: { data: task } })
    setLoading(false)
    show(false)
  }

  return (
    <>
      <h2 className={`text-center ${classes.subtitle}`}>Añadir una tarea</h2>
      <Col className='my-3'>
        <label htmlFor='title' className={`fw-bold ${classes.subtitle}`}>
          Título
        </label>
        <InputText
          id='title'
          value={task.title}
          className={classes.input}
          onChange={(ev) => handleChange(ev)}
        />
      </Col>
      <Col className='text-end'>
        <Button onClick={handleAddTask} disabled={!task.title ? true : false}>
          {!loading ? 'Guardar' : <Spinner animation='border' />}
        </Button>
      </Col>
    </>
  )
}
