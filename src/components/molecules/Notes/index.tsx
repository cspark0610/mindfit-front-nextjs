// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Row } from 'react-bootstrap'
import { Pencil, Sticky, XSquare } from 'react-bootstrap-icons'

// prime components
import { EditorTextChangeParams } from 'primereact/editor'

// Components
import { CardNote } from 'components/atoms/CardNote'
import { StyledEditor } from 'components/atoms/Editor'

// styles
import classes from 'styles/Notes/notes.module.scss'

// types
import { FC } from 'react'

export const Notes: FC = () => {
  const [showEdit, setShowEdit] = useState(false)
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [id, setId] = useState<number>()

  const handleChangeNote = (ev: EditorTextChangeParams) => {
    setNote(ev.htmlValue ?? '')
  }

  const saveNote = () => {
    if (id != undefined) {
      notes[id] = note
    } else {
      setNotes([...notes, note])
    }
    setId(undefined)
    setNote('')
    setShowEdit(false)
  }

  const removed = (id: number) => {
    const newData = notes.filter((_, idx) => idx != id)
    setNotes(newData)
    setId(undefined)
  }

  const edit = (id: number) => {
    setId(id)
    setNote(notes[id])
    setShowEdit(true)
  }

  return (
    <>
      <Row xs='auto' className='mb-3 justify-content-between'>
        <h5 className='mb-4'>
          <Sticky className={`me-2 ${classes.icon}`} />
          Notas
        </h5>
        <Button
          variant='light'
          onClick={() => {
            setNote('')
            setShowEdit(!showEdit)
          }}>
          {!showEdit ? (
            <Pencil className={classes.icon} />
          ) : (
            <XSquare className={classes.icon} />
          )}
        </Button>
      </Row>
      {!showEdit ? (
        <CardNote notes={notes} edit={edit} removed={removed} />
      ) : (
        <StyledEditor
          id={id}
          note={note}
          readOnly={false}
          handleChangeNote={handleChangeNote}
          saveNote={saveNote}
          removed={removed}
        />
      )}
    </>
  )
}
