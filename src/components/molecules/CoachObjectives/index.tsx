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
      category: 'Communication',
      icon: PrimeIcons.BOOK,
      tasks: [
        { description: 'Be more assertive', progress: 100 },
        { description: 'Not taking anything personally', progress: 50 },
        {
          description: 'Talk to a colleague every day about my personal life',
          progress: 66,
        },
      ],
    },
    {
      category: 'Health',
      icon: PrimeIcons.HEART,
      tasks: [
        {
          description: 'Eat fruits or vegetables at every meal',
          progress: 50,
        },
        { description: 'Avoid junk food', progress: 70 },
        {
          description: 'Engage in moderate physical activity 5 times a week.',
          progress: 80,
        },
      ],
    },
    {
      category: 'Emotional state',
      icon: PrimeIcons.THUMBS_UP,
      tasks: [
        {
          description: 'Practice meditation at least once a day.',
          progress: 0,
        },
        {
          description: 'Practice meditation at least once a day.',
          progress: 0,
        },
        {
          description: 'Living more in the present and less in the future',
          progress: 0,
        },
      ],
    },
  ]

  return (
    <Container className='mt-5 mt-lg-0'>
      <p className={`mb-2 fs-5 fw-bold ${classes.subtitle}`}>
        You met your goals!
      </p>
      <p className={`fs-6 fw-bold mb-0 ${classes.paragraph}`}>Keep it up!</p>
      <p className={`mb-4 fs-6 ${classes.paragraph}`}>
        Accomplishing these tasks will help you develop the changes you need to
        improve your productivity. to improve your productivity
      </p>
      <p className={`mb-3 fs-5 fw-bold ${classes.subtitle}`}>
        Tasks accomplished
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
