// main tools
import { useState } from 'react'

// bootstrap components
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { Sticky } from 'react-bootstrap-icons'

// prime components
import { PrimeIcons } from 'primereact/api'
import { Editor, EditorTextChangeParams } from 'primereact/editor'

// Components
import { CardNote } from 'components/atoms/CardNote'

// styles
import classes from 'styles/Notes/notes.module.scss'

// types
import { FC } from 'react'

export const Notes: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [note, setNote] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [validate, setValidate] = useState(false)

  const handleChangeNote = (ev: EditorTextChangeParams) => {
    if (ev.htmlValue) {
      setNote(ev.htmlValue)
      setValidate(true)
    } else setValidate(false)
  }

  const addNote = () => {
    setNotes([...notes, note])
    setNote('')
    setShowModal(false)
  }

  const renderHeader = () => {
    return (
      <span className={`ql-formats ${classes.header}`}>
        <button className='ql-bold' aria-label='Bold'></button>
        <button className='ql-italic' aria-label='Italic'></button>
        <button className='ql-underline' aria-label='Underline'></button>
      </span>
    )
  }

  return (
    <>
      <Row xs='auto' className='mb-3 justify-content-between'>
        <h5 className='mb-4'>
          <Sticky className={`me-2 ${classes.icon}`} />
          Notas
        </h5>
        <Button variant='light' onClick={() => setShowModal(!showModal)}>
          <i className={`${PrimeIcons.PENCIL}  ${classes.icon}`} />
        </Button>
      </Row>
      {notes.length != 0 ? (
        notes.map((note: string, idx: number) => (
          <CardNote key={idx} note={note} />
        ))
      ) : (
        <p>No tienes notas</p>
      )}
      <Modal
        centered
        className={classes.modal}
        contentClassName={classes.section}
        show={showModal}
        onHide={() => setShowModal(!showModal)}
        size='lg'>
        <Modal.Header className={classes.close} closeButton />
        <Modal.Body>
          <Editor
            className='mb-3'
            headerTemplate={renderHeader()}
            style={{ height: '320px' }}
            value={note}
            placeholder='escribe tu nota aqui'
            onTextChange={(ev) => handleChangeNote(ev)}
          />
          <Row className='justify-content-end'>
            <Col xs='auto'>
              <Button disabled={!validate}  className={classes.button} onClick={addNote}>
                Guardar
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  )
}
