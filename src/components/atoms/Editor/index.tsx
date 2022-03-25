// bootstrap components
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'

// prime components
import { Editor } from 'primereact/editor'

// styles
import classes from 'styles/UI/Editor/editor.module.scss'

// types
import { FC } from 'react'
import { StyledEditorProps } from 'types/components/Editor'

export const StyledEditor: FC<StyledEditorProps> = ({
  loading,
  coachNote,
  save,
  removed,
  ...props
}) => {
  const renderHeader = () => {
    if (!props.readOnly) {
      return (
        <span className='ql-formats'>
          <button className='ql-bold' aria-label='Bold'></button>
          <button className='ql-italic' aria-label='Italic'></button>
          <button className='ql-underline' aria-label='Underline'></button>
          <button className='ql-list' value='bullet'></button>
        </span>
      )
    } else return <span />
  }

  return (
    <>
      <Col className={classes.block} />
      <Editor
        {...props}
        className={classes.edit}
        headerTemplate={renderHeader()}
        value={coachNote.note}
        placeholder='escribe tu nota...'
      />
      {!props.readOnly && (
        <Row xs='auto' className='mt-3 justify-content-between'>
          <Col>
            {!coachNote.id || (
              <Button
                variant='light'
                className=''
                onClick={() => removed(coachNote.id)}>
                <Trash className={classes.icon} />
              </Button>
            )}
          </Col>
          <Col xs='auto'>
            <Button
              disabled={!coachNote.note}
              className={classes.button}
              onClick={save}>
              {loading ? (
                <Spinner animation='border' color='primary' />
              ) : (
                'Guardar'
              )}
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}
