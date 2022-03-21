// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'
import { Pencil, Sticky, XSquare } from 'react-bootstrap-icons'

// prime components
import { EditorTextChangeParams } from 'primereact/editor'

// Components
import { CardNote } from 'components/atoms/CardNote'
import { StyledEditor } from 'components/atoms/Editor'

// commons
import { microServices } from 'commons'

// gql
import { useMutation, useQuery } from '@apollo/client'
import GET_COACH_NOTES from 'lib/queries/Coachee/getCoachNotes.gql'
import CREATE_NOTE from 'lib/mutations/Coach/Notes/create.gql'
import DELETE_NOTE from 'lib/mutations/Coach/Notes/delete.gql'
import UPDATE_NOTE from 'lib/mutations/Coach/Notes/update.gql'

// styles
import classes from 'styles/Notes/notes.module.scss'

// types
import { FC } from 'react'
import { CoacheeDataType } from 'types/models/Coachee'

export const Notes: FC<{ coachee: CoacheeDataType; content: any }> = ({
  coachee,
  content,
}) => {
  const [showEdit, setShowEdit] = useState(false)
  const [notes, setNotes] = useState<CoacheeDataType['coachNotes']>([])
  const [noteId, setNoteId] = useState({ id: NaN, note: '' })
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

  const handleChangeNote = (ev: EditorTextChangeParams) => {
    setNoteId({ ...noteId, note: ev.htmlValue ?? '' })
  }

  const saveNote = async () => {
    setLoading(true)
    if (noteId.id) {
      await updateNote({
        variables: { coachNoteId: noteId.id, note: noteId.note },
      })
    } else {
      await createNote({
        variables: { coacheeId: coachee.id, note: noteId.note },
      })
    }
    setShowEdit(false)
    setLoading(false)
  }

  const removed = async (id: number) => {
    setLoading(true)
    await deleteNote({
      variables: { coachNoteId: id },
    })
    setShowEdit(false)
    setLoading(false)
  }

  const edit = async (note: { id: number; note: string }) => {
    setNoteId(note)
    setShowEdit(true)
  }

  return (
    <>
      <Row xs='auto' className='mb-3 justify-content-between'>
        <Col>
          <h4 className={`fw-bold ${classes.title}`}>
            <Sticky className={`me-2  ${classes.icon}`} />
            {content.notesTitle}
          </h4>
        </Col>
        <Col>
          <Button
            className='fs-3 p-0'
            variant='light'
            onClick={() => {
              setNoteId({ id: NaN, note: '' })
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
        <CardNote notes={notes} edit={edit} removed={removed} />
      ) : (
        <StyledEditor
          loading={loading}
          coachNote={noteId}
          readOnly={false}
          onTextChange={handleChangeNote}
          save={saveNote}
          removed={removed}
        />
      )}
    </>
  )
}
