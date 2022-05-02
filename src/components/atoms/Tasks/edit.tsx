// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col, Spinner } from 'react-bootstrap'

// prime components
import { PrimeIcons } from 'primereact/api'
import { InputText } from 'primereact/inputtext'
import { ProgressBar } from 'primereact/progressbar'

// servies
import { useCoacheeObjectives } from 'services/coachee'

// styles
import classes from 'styles/CoachObjectives/objectivesManagement.module.scss'

// type
import { FC } from 'react'
import { ChangeType } from 'types'
import { TasksProps } from 'types/components/Objectives'

export const EditTasks: FC<{
  taskData: TasksProps
  show: (ev: boolean) => void
}> = ({ taskData, show }) => {
  const [task, setTask] = useState(taskData)
  const [loading, setLoading] = useState(false)
  const { updateTask, deleteTask } = useCoacheeObjectives()

  const handleChange = (ev: ChangeType) => {
    setTask({ ...task, [ev.target.id]: ev.target.value })
  }

  const handleChangeBar = (ev: number) => {
    setTask({ ...task, progress: ev })
  }

  const handleEditTask = async () => {
    setLoading(true)
    await updateTask({
      variables: {
        data: { title: task.title, progress: task.progress },
        id: task.id,
      },
    })
    setLoading(false)
    show(false)
  }

  const handleDeleteTask = async () => {
    setLoading(true)
    await deleteTask({ variables: { id: task.id } })
    setLoading(false)
    show(false)
  }

  return (
    <>
      <h2 className={`text-center ${classes.subtitle}`}>Editar una tarea</h2>
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
      <div className='my-3 d-flex justify-content-between align-items-center'>
        <Col xs='auto'>
          <Button
            variant='light'
            disabled={task.progress === 0}
            onClick={() => handleChangeBar(task.progress - 5)}>
            <i className={`${classes.progress_icon} ${PrimeIcons.MINUS}`} />
          </Button>
        </Col>
        <Col xs={10}>
          <ProgressBar
            className={`${
              classes[task.progress === 100 ? 'progress_full' : 'progress']
            }`}
            value={task.progress}
          />
        </Col>
        <Col xs='auto'>
          <Button
            variant='light'
            disabled={task.progress === 100}
            onClick={() => handleChangeBar(task.progress + 5)}>
            <i className={`${classes.progress_icon} ${PrimeIcons.PLUS}`} />
          </Button>
        </Col>
      </div>
      <Col className='text-end'>
        <Button className='me-3' variant='danger' onClick={handleDeleteTask}>
          {!loading ? 'Eliminar' : <Spinner animation='border' />}
        </Button>
        <Button onClick={handleEditTask}>
          {!loading ? 'Guardar' : <Spinner animation='border' />}
        </Button>
      </Col>
    </>
  )
}
