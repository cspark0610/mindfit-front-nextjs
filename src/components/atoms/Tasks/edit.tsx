// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col } from 'react-bootstrap'

// prime components
import { PrimeIcons } from 'primereact/api'
import { InputText } from 'primereact/inputtext'
import { ProgressBar } from 'primereact/progressbar'

// styles
import classes from 'styles/CoachObjectives/objectivesManagement.module.scss'

// type
import { FC } from 'react'
import { ChangeType } from 'types'
import { TasksProps } from 'types/components/Objectives'

export const EditTasks: FC<TasksProps> = (props) => {
  const [task, setTask] = useState(props)

  const handleChange = (ev: ChangeType) => {
    setTask({ ...task, [ev.target.id]: ev.target.value })
  }

  const handleChangeBar = (ev: number) => {
    setTask({ ...task, progress: ev })
  }

  const handleEditTask = () => {
    console.log(task)
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
          <i
            role='button'
            onClick={() => handleChangeBar(task.progress - 5)}
            className={`${classes.progress_icon} ${PrimeIcons.MINUS}`}
          />
        </Col>
        <Col xs={10}>
          <ProgressBar className={classes.progress} value={task.progress} />
        </Col>
        <Col xs='auto'>
          <i
            role='button'
            onClick={() => handleChangeBar(task.progress + 5)}
            className={`${classes.progress_icon} ${PrimeIcons.PLUS}`}
          />
        </Col>
      </div>
      <Col className='text-end'>
        <Button onClick={handleEditTask}>Guardar</Button>
      </Col>
    </>
  )
}
