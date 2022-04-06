// main tools
import { useRef } from 'react'
import dayjs from 'dayjs'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'
import { confirmDialog } from 'primereact/confirmdialog'
import { Calendar, FileEarmarkPerson } from 'react-bootstrap-icons'

// prime component
import { ContextMenu } from 'primereact/contextmenu'
import { PrimeIcons } from 'primereact/api'

// commons
import { formatDate } from 'commons'

// styles
import classes from 'styles/CardEvaluation/styles.module.scss'

// types
import { FC } from 'react'

type CardEvaluationProps = {
  edit: (evaluation: {
    id: number
    evaluation: string
    createdAt: string
  }) => void
  evaluation: { id: number; evaluation: string; createdAt: string }
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
        <FileEarmarkPerson className={classes.icon} />
        <Row className={classes.paragraph}>
          <div dangerouslySetInnerHTML={{ __html: evaluation.evaluation }} />
        </Row>
        <Row className='w-100 mt-2'>
          <Col xs={12} className={classes.footer}>
            <span>
              <Calendar className={classes.icon_secondary} />
              {dayjs(formatDate(evaluation.createdAt)).format('DD/MM/YYYY')}
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
