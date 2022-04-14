// main tools
import { useRef, useState } from 'react'

// bootstrap components
import { Button, Row } from 'react-bootstrap'

// prime component
import { ContextMenu } from 'primereact/contextmenu'

// styles
import classes from 'styles/CardNote/cardNote.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'

export const CardNote: FC<{
  content: any
  notes: CoacheeDataType['coachNotes']
  edit: (note: { id: number; note: string }) => void
  removed: (id: number) => void
}> = ({ content, notes, edit, removed }) => {
  const [selectedNote, setSelectedNote] = useState({ id: NaN, note: '' })
  const menuRef = useRef<ContextMenu>(null)

  const menuItems = [
    {
      label: 'Editar',
      icon: 'pi-pi-pencil',
      command: () => edit(selectedNote),
    },
    {
      label: 'Eliminar',
      icon: 'pi-pi-trash',
      command: () => removed(selectedNote.id),
    },
  ]

  return (
    <>
      <ContextMenu
        ref={menuRef}
        model={menuItems}
        onHide={() => setSelectedNote({ id: NaN, note: '' })}
      />
      {notes?.length ? (
        notes?.map((item: { id: number; note: string }) => (
          <section
            key={item.id}
            className={classes.section}
            onContextMenu={(e) => {
              menuRef.current?.show(e)
              setSelectedNote(item)
            }}>
            <Row>
              <p>10/12/22</p>
            </Row>
            <Row className={classes.paragraph}>
              <div dangerouslySetInnerHTML={{ __html: item.note }} />
            </Row>
            <Row className='justify-content-end'>
              <Button
                variant='light'
                className={classes.button}
                onClick={() => edit(item)}>
                {content.SeeMoreButton}
              </Button>
            </Row>
          </section>
        ))
      ) : (
        <p>no hay notas para este coachee</p>
      )}
    </>
  )
}
