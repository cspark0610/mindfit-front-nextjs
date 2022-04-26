// bootstrap components
import { Button, Col } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'

// styles
import classes from 'styles/CoachObjectives/objectivesManagement.module.scss'

// type
import { FC, useState } from 'react'
import { ChangeType } from 'types'

export const AddTasks: FC<{ objectiveId: number }> = ({ objectiveId }) => {
  const [task, setTask] = useState({
    title: '',
    coacheeObjectiveId: objectiveId,
  })

  const handleChange = (ev: ChangeType) => {
    setTask({ ...task, [ev.target.id]: ev.target.value })
  }

  const handleAddTask = () => {
    console.log(task)
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
        <Button onClick={handleAddTask}>Guardar</Button>
      </Col>
    </>
  )
}
