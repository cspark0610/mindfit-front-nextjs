// bootstrap components
import { Button, Col, Row } from 'react-bootstrap'

// prime components
import { Editor, EditorTextChangeParams } from 'primereact/editor'

// styles
import classes from 'styles/Notes/notes.module.scss'

// types
import { FC } from 'react'
import { Trash } from 'react-bootstrap-icons'

export const StyledEditor: FC<{
  id: number | undefined
  note: string
  readOnly: boolean
  saveNote: () => void
  removed: (id: number) => void
  handleChangeNote: (ev: EditorTextChangeParams) => void
}> = ({ id, note, readOnly, saveNote, removed, handleChangeNote }) => {
  const renderHeader = () => {
    if (!readOnly) {
      return (
        <span className={`ql-formats ${classes.toolbar}`}>
          <button className='ql-bold' aria-label='Bold'></button>
          <button className='ql-italic' aria-label='Italic'></button>
          <button className='ql-underline' aria-label='Underline'></button>
          <button className='ql-list' value='bullet'></button>
        </span>
      )
    } else return <span className={classes.toolbar} />
  }

  return (
    <>
      <Col className={classes.block} />
      <Editor
        readOnly={readOnly}
        className={classes.edit}
        headerTemplate={renderHeader()}
        value={note}
        placeholder='escribe tu nota...'
        onTextChange={(ev) => handleChangeNote(ev)}
      />
      {!readOnly && (
        <Row xs='auto' className='mt-3 justify-content-between'>
          <Col>
            {id != undefined && (
              <Button
                disabled={!note}
                variant='light'
                className=''
                onClick={() => removed(id)}>
                <Trash className={classes.icon} />
              </Button>
            )}
          </Col>
          <Col xs='auto'>
            <Button
              disabled={!note}
              className={classes.button}
              onClick={saveNote}>
              Guardar
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}
