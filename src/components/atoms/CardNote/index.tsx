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

export const CardNote: FC<{
  notes: string[]
  edit: (id: number) => void
  removed: (id: number) => void
}> = ({ notes, edit, removed }) => {
  const [selectedNote, setSelectedNote] = useState(NaN)
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
      command: () => removed(selectedNote),
    },
  ]

  return (
    <>
      <ContextMenu model={menuItems} ref={menuRef} onHide={()=> setSelectedNote(NaN)} />
      {notes.length ? (
        notes.map((note, id) => (
          <Button
            key={id}
            className={`mb-3 ${classes.section} ${classes.button}`}
            onClick={() => edit(id)}
            onContextMenu={(e) => {
              menuRef.current?.show(e), setSelectedNote(id)
            }}>
            <Row xs='auto' className='fw-bold justify-content-between'>
              <p>10/12/21</p>
              <p>09:30 AM</p>
            </Row>
            <Row className={classes.paragraph}>
              <div dangerouslySetInnerHTML={{ __html: note }} />
            </Row>
          </Button>
        ))
      ) : (
        <p>no hay notas para este coachee</p>
      )}
    </>
  )
}
