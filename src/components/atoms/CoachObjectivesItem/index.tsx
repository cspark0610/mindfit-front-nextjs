// bootstrap components
import { Col } from 'react-bootstrap'

// Primereact Componente
import { ProgressBar } from 'primereact/progressbar'

// Stlye
import classes from 'styles/CoachObjectivesItem/coachObjectivesItem.module.scss'

// Type
import { FC } from 'react'

export const CoachObjectivesItem: FC<any> = (props) => (
  <Col className={classes.goalsCard} md={6} xl={4}>
    <div className={classes.section}>
      <div className={`d-flex ${classes.section_header}`}>
        <i className={`fs-4 ${props.icon}`} />
        <p className='fw-bold fs-6 my-0'>{props.category}</p>
      </div>
      {props.tasks.map((task: any) => (
        <div key={task.description} className={`text-center ${classes.task}`}>
          <p className={classes.task_title}>{task.description}</p>
          <ProgressBar className={classes.progress} value={task.progress} />
        </div>
      ))}
    </div>
  </Col>
)
