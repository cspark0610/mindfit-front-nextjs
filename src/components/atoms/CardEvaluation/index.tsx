// main tools
import { useRef } from 'react'

// bootstrap components
import { Button, Row } from 'react-bootstrap'

// prime component
import { ContextMenu } from 'primereact/contextmenu'
import { PrimeIcons } from 'primereact/api'

// styles
import classes from 'styles/CardEvaluation/styles.module.scss'

// types
import { FC } from 'react'

type CardEvaluationProps = {
  edit: (evaluation: { id: number; evaluation: string }) => void
  evaluation: { id: number; evaluation: string }
  removed: (id: number) => void
}

export const CardEvaluation: FC<CardEvaluationProps> = ({
  edit,
  removed,
  evaluation,
}) => {
  const menuRef = useRef<ContextMenu>(null)

  const menuItems = [
    {
      label: 'Editar',
      icon: PrimeIcons.PENCIL,
      command: () => edit(evaluation),
    },
    {
      label: 'Eliminar',
      icon: PrimeIcons.TRASH,
      command: () => removed(evaluation.id),
    },
  ]

  return (
    <>
      <ContextMenu ref={menuRef} model={menuItems} />
      <Button
        key={evaluation.id}
        variant='light'
        className={`mb-3 ${classes.button}`}
        onClick={() => edit(evaluation)}
        onContextMenu={(e) => menuRef.current?.show(e)}>
        <Row className={classes.paragraph}>
          <div dangerouslySetInnerHTML={{ __html: evaluation.evaluation }} />
        </Row>
      </Button>
    </>
  )
}
