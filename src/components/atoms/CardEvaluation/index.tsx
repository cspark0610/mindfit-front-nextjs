// main tools
import { useRef } from 'react'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'
import { confirmDialog } from 'primereact/confirmdialog'

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
      command: () => confirmRemove(evaluation.id),
    },
  ]

  const confirmRemove = (id: number) => {
    confirmDialog({
      acceptClassName: 'p-button-danger',
      header: 'Confirmación de eliminación',
      message: '¿Desea proceder con la eliminación?',
      rejectLabel: 'No',
      acceptLabel: 'Sí',
      accept: () => removed && removed(id),
    })
  }

  return (
    <>
      <ContextMenu ref={menuRef} model={menuItems} />
      <section
        className={`text-center ${classes.section}`}
        onContextMenu={(e) => menuRef.current?.show(e)}>
        <Row className='h-100 justify-content-between'>
          <FileEarmarkPerson className={classes.icon} />
          <div
            className={classes.paragraph}
            dangerouslySetInnerHTML={{ __html: evaluation.evaluation }}
          />
          <Row xs='auto' className='justify-content-between'>
            <p>
              <Calendar className={classes.icon_secondary} />
              10/01/22
            </p>
            <Col>
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
        </Row>
      </section>
    </>
  )
}
