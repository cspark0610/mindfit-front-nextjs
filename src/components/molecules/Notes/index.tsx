// main tools
import { useState } from 'react'

// bootstrap components
import { Pencil, Sticky, XSquare } from 'react-bootstrap-icons'
import { confirmDialog } from 'primereact/confirmdialog'
import { Button, Col, Row } from 'react-bootstrap'

// Components
import { StyledEditor } from 'components/atoms/Editor'
import { CardNote } from 'components/atoms/CardNote'

// commons
import { microServices } from 'commons'

// gql
import GET_COACH_NOTES from 'lib/queries/Coachee/getCoachNotes.gql'
import CREATE_NOTE from 'lib/mutations/Coach/Notes/create.gql'
import DELETE_NOTE from 'lib/mutations/Coach/Notes/delete.gql'
import UPDATE_NOTE from 'lib/mutations/Coach/Notes/update.gql'
import { useMutation, useQuery } from '@apollo/client'

// styles
import classes from 'styles/Notes/notes.module.scss'

// types
import { EditorTextChangeParams } from 'primereact/editor'
import { CoacheeDataType } from 'types/models/Coachee'
import { FC } from 'react'

export const Notes: FC<{ coachee: CoacheeDataType; content: any }> = ({
  coachee,
  content,
}) => {
  const [notes, setNotes] = useState<CoacheeDataType['coachNotes']>([])
  const [singleNote, setSingleNote] = useState({ id: NaN, note: '' })
  const [showEdit, setShowEdit] = useState(false)
  const [loading, setLoading] = useState(false)

  const { refetch } = useQuery(GET_COACH_NOTES, {
    variables: { id: coachee.id },
    context: { ms: microServices.backend },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => setNotes(data.findCoacheeById.coachNotes),
  })
  const [createNote] = useMutation(CREATE_NOTE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })
  const [updateNote] = useMutation(UPDATE_NOTE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })
  const [deleteNote] = useMutation(DELETE_NOTE, {
    context: { ms: microServices.backend },
    onCompleted: () => refetch(),
  })

  const handleChangeNote = (ev: EditorTextChangeParams) =>
    setSingleNote({ ...singleNote, note: ev.htmlValue ?? '' })

  const saveNote = async () => {
    setLoading(true)
    if (singleNote.id)
      await updateNote({
        variables: { coachNoteId: singleNote.id, note: singleNote.note },
      })
    else
      await createNote({
        variables: { coacheeId: coachee.id, note: singleNote.note },
      })

    setShowEdit(false)
    setLoading(false)
  }

  const removed = async (id: number) => {
    setLoading(true)
    await deleteNote({ variables: { coachNoteId: id } })
    setShowEdit(false)
    setLoading(false)
  }

  const edit = (note: { id: number; note: string }) => {
    setSingleNote(note)
    setShowEdit(true)
  }

  const confirmRemove = (id: number) => {
    confirmDialog({
      acceptClassName: 'p-button-danger',
      header: 'Confirmación de eliminación',
      message: '¿Desea proceder con la eliminación?',
      rejectLabel: 'No',
      acceptLabel: 'Sí',
      accept: () => removed(id),
    })
  }

  return (
    <div className={classes.container}>
      <Row xs='auto' className='mb-3 justify-content-between'>
        <Col>
          <h4 className={`fw-bold ${classes.title}`}>
            <Sticky className={`me-2  ${classes.icon}`} />
            {content.notesTitle}
          </h4>
        </Col>
        <Col>
          <Button
            variant='light'
            className='fs-3 p-0'
            onClick={() => {
              setSingleNote({ id: NaN, note: '' })
              setShowEdit(!showEdit)
            }}>
            {!showEdit ? (
              <Pencil className={classes.icon} />
            ) : (
              <XSquare className={classes.icon} />
            )}
          </Button>
        </Col>
      </Row>
      {!showEdit ? (
        <CardNote
          content={content}
          notes={notes}
          edit={edit}
          removed={confirmRemove}
        />
      ) : (
        <StyledEditor
          content={content}
          save={saveNote}
          readOnly={false}
          loading={loading}
          removed={confirmRemove}
          coachNote={singleNote}
          onTextChange={handleChangeNote}
        />
      )}
    </div>
  )
}
