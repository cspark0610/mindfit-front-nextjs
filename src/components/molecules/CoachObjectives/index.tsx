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
        { description: 'Ser más asertivo', progress: 100 },
        { description: 'No tomarme nada como personal', progress: 50 },
        {
          description: 'Hablar cada día con un compañero sobre vida personal',
          progress: 66,
        },
      ],
    },
    {
      category: 'Salud',
      icon: PrimeIcons.HEART,
      tasks: [
        {
          description: 'Comer frutas u hortalizas en cada comida',
          progress: 50,
        },
        { description: 'Evitar la comida basura', progress: 70 },
        {
          description:
            'Practicar actividad física moderada 5 veces a la semana',
          progress: 80,
        },
      ],
    },
    {
      category: 'Estado emocional',
      icon: PrimeIcons.THUMBS_UP,
      tasks: [
        {
          description: 'Practicar meditación al menos 1 vez al día',
          progress: 0,
        },
        {
          description: 'Caminar al aire libre 4 veces a la semana',
          progress: 0,
        },
        { description: 'Vivir más en presente y menos en futuro', progress: 0 },
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
