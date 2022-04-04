// main tools
import { useRef } from 'react'

// bootstrap components
import { Button, Row, Col } from 'react-bootstrap'

// prime component
import { ContextMenu } from 'primereact/contextmenu'
import { PrimeIcons } from 'primereact/api'

// styles
import classes from 'styles/CardEvaluation/styles.module.scss'

// types
import { FC } from 'react'
import { Calendar, FileEarmarkPerson } from 'react-bootstrap-icons'

type CardEvaluationProps = {
  edit: (evaluation: { id: number; evaluation: string }) => void
  evaluation: { id: number; evaluation: string }
  removed: (id: number) => void
  readOnly: () => void
}

export const CardEvaluation: FC<CardEvaluationProps> = ({
  edit,
  removed,
  readOnly,
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
      <section
        className={`text-center ${classes.section}`}
        onContextMenu={(e) => menuRef.current?.show(e)}>
        <FileEarmarkPerson className={classes.icon} />
        <Row className={classes.paragraph}>
          <div dangerouslySetInnerHTML={{ __html: evaluation.evaluation }} />
        </Row>
        <Row className='w-100 mt-2'>
          <Col xs={12} className={classes.footer}>
            <span>
              <Calendar className={classes.icon_secondary} />
              10/01/22
            </span>
            <Button
              variant='secondary'
              className={classes.button}
              onClick={() => {
                edit(evaluation), readOnly()
              }}>
              Ver
            </Button>
          </Col>
        </Row>
      </section>
    </>
  )
}
