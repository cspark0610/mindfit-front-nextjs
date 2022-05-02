// main tools
import { useState, useRef } from 'react'

// components
import { AddTasks } from '../Tasks/add'
import { EditTasks } from '../Tasks/edit'

// bootstrap components
import { Button, Col, Modal, Row } from 'react-bootstrap'

// prime componente
import { Menu } from 'primereact/menu'
import { PrimeIcons } from 'primereact/api'
import { ProgressBar } from 'primereact/progressbar'
import { ContextMenu } from 'primereact/contextmenu'

// stlye
import classes from 'styles/CoachObjectivesItem/coachObjectivesItem.module.scss'

// type
import { FC } from 'react'
import { ObjectivesProps, TasksProps } from 'types/components/Objectives'

export const CoacheeObjectivesItem: FC<{
  editGoal: (ev: ObjectivesProps) => void
  removeGoal: (ev: number) => void
  goals: ObjectivesProps
}> = ({ editGoal, removeGoal, goals }) => {
  const menu = useRef<Menu>(null)
  const cm = useRef<ContextMenu>(null)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showEditTask, setShowEditTask] = useState(false)
  const [task, setTask] = useState({ id: NaN, title: '', progress: NaN })

  const items = [
    {
      label: 'Editar',
      icon: 'pi pi-pencil',
      command: () => editGoal(goals),
    },
    {
      label: 'Eliminar',
      icon: 'pi pi-trash',
      command: () => removeGoal(goals.id),
    },
  ]

  const editTasks = (ev: TasksProps) => {
    setTask(ev)
    setShowEditTask(true)
  }

  return (
    <>
      <ContextMenu model={items} ref={cm} />
      <Col
        xs={12}
        md={6}
        className={classes.goalsCard}
        onContextMenu={(e) => cm.current?.show(e)}>
        <div className={`text-center ${classes.section}`}>
          <div className={`d-flex mb-3 ${classes.section_header}`}>
            <Col>
              <Row xs='auto' className='justify-content-center'>
                <i className={`fs-4 ${goals.icon}`} />
                <p className='fw-bold fs-6 my-0'>{goals.title}</p>
              </Row>
            </Col>
            <Menu model={items} popup ref={menu} />
            <i
              role='button'
              onClick={(event) => menu.current?.toggle(event)}
              className={`${classes.icon} ${PrimeIcons.ALIGN_JUSTIFY}`}
            />
          </div>
          {goals.tasks?.length ? (
            goals.tasks?.map((task) => (
              <div key={task.title} className={`text-center ${classes.task}`}>
                <div className='d-flex justify-content-between align-items-center'>
                  <Col xs={10}>
                    <p className={classes.task_title}>{task.title}</p>
                  </Col>
                  <i
                    role='button'
                    onClick={() => editTasks(task)}
                    className={`${classes.icon} ${PrimeIcons.PENCIL}`}
                  />
                </div>
                <ProgressBar
                  className={`${
                    classes[
                      task.progress === 100 ? 'progress_full' : 'progress'
                    ]
                  }`}
                  value={task.progress}
                />
              </div>
            ))
          ) : (
            <p>no has añadido tareas</p>
          )}
          <Button variant='light' onClick={() => setShowAddTask(true)}>
            <i className={`${classes.icon} ${PrimeIcons.PLUS}`} />
          </Button>
        </div>
      </Col>
      <Modal
        centered
        size='lg'
        show={showAddTask}
        className={classes.modal}
        onHide={() => setShowAddTask(false)}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body className={classes.section_modal}>
          <AddTasks goalId={goals.id} show={(ev) => setShowAddTask(ev)} />
        </Modal.Body>
      </Modal>
      <Modal
        centered
        size='lg'
        show={showEditTask}
        className={classes.modal}
        onHide={() => setShowEditTask(false)}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body className={classes.section_modal}>
          <EditTasks taskData={task} show={(ev) => setShowEditTask(ev)} />
        </Modal.Body>
      </Modal>
    </>
  )
}
