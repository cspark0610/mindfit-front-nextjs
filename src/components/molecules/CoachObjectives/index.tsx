// components
import { CoachObjectivesItem } from 'components/atoms/CoachObjectivesItem'

// Primeicons
import { PrimeIcons } from 'primereact/api'

// Bootstrap components
import { Container, Row } from 'react-bootstrap'

// Styles
import classes from 'styles/CoachObjectives/coachObjectives.module.scss'

// Type
import { FC } from 'react'

export const CoachObjectives: FC = () => {
  const data = [
    {
      category: 'Comunicación',
      icon: PrimeIcons.BOOK,
      tasks: [
        { description: 'Agendar una sesion con tu coach', progress: 100 },
        { description: 'Asistir a 2 sesiones con tu coach', progress: 50 },
        { description: 'Completar 3 tareas asignadas', progress: 66 },
      ],
    },
    {
      category: 'Liderazgo',
      icon: PrimeIcons.USERS,
      tasks: [
        { description: 'Delegar 3 tareas dentro de tu equipo', progress: 50 },
        { description: 'Asistir a 1 sesion de coaching grupal', progress: 100 },
      ],
    },
    {
      category: 'Salud',
      icon: PrimeIcons.HEART,
      tasks: [
        { description: 'Completar formulario psicologico', progress: 0 },
        { description: 'Realizar prueba de diagnostico', progress: 0 },
        { description: 'Asistir a 1 sesion motivacional', progress: 0 },
      ],
    },
  ]

  return (
    <Container className='mt-5 mt-lg-0'>
      <p className={`mb-2 fs-5 fw-bold ${classes.subtitle}`}>
        ¡Cumpliste tus objetivos!
      </p>
      <p className={`fs-6 fw-bold mb-0 ${classes.paragraph}`}>¡Sigue así!</p>
      <p className={`mb-4 fs-6 ${classes.paragraph}`}>
        Cumplir estas tareas te ayudará a desarrollar los cambios que necesitas
        para mejorar tu productividad
      </p>
      <p className={`mb-3 fs-5 fw-bold ${classes.subtitle}`}>
        Tareas cumplidas
      </p>
      <Container>
        <Row className='justify-content-between'>
          {data.map((activity) => (
            <CoachObjectivesItem key={activity.category} {...activity} />
          ))}
        </Row>
      </Container>
    </Container>
  )
}
