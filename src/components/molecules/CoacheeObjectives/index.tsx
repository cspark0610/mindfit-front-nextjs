// main tools
import { useState } from 'react'

// components
import { AddObjectives } from 'components/atoms/Objectives/add'
import { EditObjectives } from 'components/atoms/Objectives/edit'
import { CoacheeObjectivesItem } from 'components/atoms/CoacheeObjectivesItem'

// primereact components
import { PrimeIcons } from 'primereact/api'
import { DataView } from 'primereact/dataview'

// bootstrap components
import { Container, Modal, Row } from 'react-bootstrap'

// styles
import classes from 'styles/CoachObjectives/coachObjectives.module.scss'

// type
import { FC } from 'react'
import { ObjectivesProps } from 'types/components/Objectives'

export const CoacheeObjectives: FC<{ content: any }> = ({ content }) => {
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showEditGoal, setShowEditGoal] = useState(false)
  const [goal, setGoal] = useState({ id: NaN, icon: '', title: '' })

  const data = [
    {
      id: 1,
      title: 'Communication',
      icon: PrimeIcons.BOOK,
      tasks: [
        { title: 'Be more assertive', progress: 100 },
        { title: 'Not taking anything personally', progress: 50 },
        {
          title: 'Talk to a colleague every day about my personal life',
          progress: 66,
        },
      ],
    },
    {
      id: 2,
      title: 'Health',
      icon: PrimeIcons.HEART,
      tasks: [
        {
          title: 'Eat fruits or vegetables at every meal',
          progress: 50,
        },
        { title: 'Avoid junk food', progress: 70 },
        {
          title: 'Engage in moderate physical activity 5 times a week.',
          progress: 80,
        },
      ],
    },
    {
      id: 3,
      title: 'Emotional state',
      icon: PrimeIcons.THUMBS_UP,
      tasks: [
        {
          title: 'Practice meditation at least once a day.',
          progress: 0,
        },
        {
          title: 'Practice meditation.',
          progress: 0,
        },
        {
          title: 'Living more in the present and less in the future',
          progress: 0,
        },
      ],
    },
  ]

  const editGoal = (ev: ObjectivesProps) => {
    setGoal(ev)
    setShowEditGoal(true)
  }

  const removeGoal = (ev: number) => {
    console.log(ev)
  }

  const itemTemplate = (product: ObjectivesProps) => (
    <CoacheeObjectivesItem
      key={`${product?.title}`}
      editGoal={editGoal}
      removeGoal={removeGoal}
      objectives={product}
    />
  )

  return (
    <>
      <Container className='mt-5 mt-lg-0'>
        <p className={`mb-2 fs-5 fw-bold ${classes.subtitle}`}>
          {content.completeGoalsTitle}
        </p>
        <div
          className={classes.paragraph}
          dangerouslySetInnerHTML={{ __html: content.completeGoalDesc }}
        />
        <Row className='justify-content-between'>
          <p className={`mb-3 fs-5 fw-bold ${classes.subtitle}`}>
            {content.tasksProgressLabel}
            <i
              role='button'
              className={`ms-3 ${classes.icon} ${PrimeIcons.PLUS}`}
              onClick={() => setShowAddGoal(true)}
            />
          </p>
        </Row>
        <DataView
          rows={4}
          value={data}
          layout='grid'
          paginator={data.length > 4}
          className={classes.dataiew}
          itemTemplate={itemTemplate}
          emptyMessage='no has creado ningún objetivo'
        />
      </Container>
      <Modal
        size='lg'
        centered
        show={showAddGoal}
        className={classes.modal}
        onHide={() => setShowAddGoal(false)}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body className={classes.section_modal}>
          <AddObjectives />
        </Modal.Body>
      </Modal>
      <Modal
        size='lg'
        centered
        show={showEditGoal}
        className={classes.modal}
        onHide={() => setShowEditGoal(false)}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body className={classes.section_modal}>
          <EditObjectives {...goal} />
        </Modal.Body>
      </Modal>
    </>
  )
}
