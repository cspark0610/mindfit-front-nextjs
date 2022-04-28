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
import { Container, Modal, Row, Spinner } from 'react-bootstrap'

// services
import { useCoacheeObjectives } from 'services/coachee'

// styles
import classes from 'styles/CoachObjectives/coachObjectives.module.scss'

// type
import { FC } from 'react'
import { ObjectivesProps } from 'types/components/Objectives'

export const CoacheeObjectives: FC<{ content: any }> = ({ content }) => {
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showEditGoal, setShowEditGoal] = useState(false)
  const [goal, setGoal] = useState({ id: NaN, icon: '', title: '' })
  const { goalsLoading, goalsData, deleteObjective } = useCoacheeObjectives()

  const editGoal = (ev: ObjectivesProps) => {
    setGoal(ev)
    setShowEditGoal(true)
  }

  const deleteGoal = async (ev: number) => {
    await deleteObjective({ variables: { id: ev } })
  }

  const itemTemplate = (product: ObjectivesProps) => (
    <CoacheeObjectivesItem
      goals={product}
      key={product?.id}
      editGoal={editGoal}
      removeGoal={deleteGoal}
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
        {!goalsLoading ? (
          <DataView
            rows={4}
            value={goalsData}
            layout='grid'
            paginator={goalsData.length > 4}
            className={classes.dataiew}
            itemTemplate={itemTemplate}
            emptyMessage='no has creado ningún objetivo'
          />
        ) : (
          <Spinner animation='border' />
        )}
      </Container>
      <Modal
        size='lg'
        centered
        show={showAddGoal}
        className={classes.modal}
        onHide={() => setShowAddGoal(false)}>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body className={classes.section_modal}>
          <AddObjectives show={(ev) => setShowAddGoal(ev)} />
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
          <EditObjectives goalData={goal} show={(ev) => setShowEditGoal(ev)} />
        </Modal.Body>
      </Modal>
    </>
  )
}
