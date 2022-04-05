// bootstrap components
import { Button, Col, Row, Spinner } from 'react-bootstrap'
import { confirmDialog } from 'primereact/confirmdialog'
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
  const renderHeader = () => (
    <span hidden={props.readOnly}>
      <button className='ql-bold' aria-label='Bold'></button>
      <button className='ql-italic' aria-label='Italic'></button>
      <button className='ql-underline' aria-label='Underline'></button>
      <button className='ql-list' value='bullet'></button>
    </span>
  )

  const confirmRemove = (id: number) => {
    confirmDialog({
      acceptClassName: 'p-button-danger',
      header: 'Confirmación de eliminación',
      message: '¿Desea proceder con la eliminación',
      rejectLabel: 'No',
      acceptLabel: 'Sí',
      accept: () => removed && removed(id),
    })
  }

  return (
    <>
      {!props.readOnly ? (
        <>
          <Editor
            {...props}
            readOnly={false}
            className={classes.edit}
            headerTemplate={renderHeader()}
            value={coachNote.note || coachNote.evaluation}
            placeholder='escribe tu nota...'
          />
          <Row xs='auto' className='m-3 justify-content-between'>
            <Col>
              {!coachNote.id || (
                <Button
                  variant='light'
                  className=''
                  onClick={() => confirmRemove(coachNote.id)}>
                  <Trash className={classes.icon} />
                </Button>
              )}
            </Col>
            <Col xs='auto'>
              <Button
                disabled={!coachNote.note && !coachNote.evaluation}
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
        </>
      ) : (
        <Editor
          {...props}
          readOnly={true}
          className={classes.edit}
          headerTemplate={renderHeader()}
          value={coachNote.note || coachNote.evaluation}
          placeholder='escribe tu nota...'
        />
      )}
    </>
  )
}
