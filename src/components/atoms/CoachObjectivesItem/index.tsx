// Primereact Componente
import { ProgressBar } from 'primereact/progressbar'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Stlye
import classes from 'styles/CoachObjectivesItem/coachObjectivesItem.module.scss'

// Type
import { FC } from 'react'

export const CoachObjectivesItem: FC = () => {
  return (
    <div className={classes.section}>
      <div className={`d-flex ${classes.section_header}`}>
        <i className={`fs-4 ${PrimeIcons.BOOK}`} />
        <p className='fw-bold fs-6 my-0'>Liderazgo</p>
      </div>
      <div className={`text-center ${classes.task}`}>
        <p className={classes.task_title}>
          Delegar 3 tareas dentro de tu equipo
        </p>
        <ProgressBar value='50' />
      </div>
      <div className={`text-center ${classes.task}`}>
        <p className={classes.task_title}>
          Delegar 3 tareas dentro de tu equipo
        </p>
        <ProgressBar value='50' />
      </div>
      <div className={`text-center ${classes.task}`}>
        <p className={classes.task_title}>
          Delegar 3 tareas dentro de tu equipo
        </p>
        <ProgressBar value='50' />
      </div>
    </div>
  )
}
