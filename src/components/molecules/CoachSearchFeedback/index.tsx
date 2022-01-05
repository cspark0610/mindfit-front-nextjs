// Main tools
import { useState, FC } from 'react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// PrimeReact components
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'

// Styles
import { Button, Container, Row } from 'react-bootstrap'
import classes from 'styles/CoachSearchFeedback/coachSearchFeedback.module.scss'

interface CoachFeedbackInterface {
  handleCloseForm: (e: any) => void
}
export const CoachSearchFeedback: FC<CoachFeedbackInterface> = ({
  handleCloseForm,
}) => {
  const [option, setOption] = useState('')
  const [details, setDetails] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (option !== '') handleCloseForm(e)
    //else show a toast
  }

  return (
    <>
      <div className={classes.section}>
        <h2 className='fw-bold fs-4 mb-5'>
          ¿No estás satisfecho con los coach sugeridos?
        </h2>
        <Container>
          <form onSubmit={handleSubmit}>
            <Row>
              <p className='fs-5 mb-5'>Puedes indicarnos ¿por qué no?</p>
              <div>
                <label
                  className={`fw-bold mb-5 ${
                    option === 'firstOption' ? classes.check : classes.uncheck
                  }`}>
                  <Checkbox
                    className='me-4'
                    checked={option === 'firstOption'}
                    onChange={(ev) => setOption(ev.target.value)}
                    value={'firstOption'}
                  />
                  No estoy identificado con los coach mostrados.
                </label>
              </div>
              <div>
                <label
                  className={
                    option === 'secondOption'
                      ? `${classes.check} fw-bold mb-5`
                      : `${classes.uncheck} fw-bold mb-5`
                  }>
                  <Checkbox
                    className='me-4'
                    checked={option === 'secondOption'}
                    onChange={(ev) => setOption(ev.target.value)}
                    value={'secondOption'}
                  />
                  Ninguno aborda mi debilidad a trabajar.
                </label>
              </div>
              <div>
                <label
                  className={
                    option === 'other'
                      ? `${classes.check} fw-bold mb-5`
                      : `${classes.uncheck} fw-bold mb-5`
                  }>
                  <Checkbox
                    className='me-4'
                    checked={option === 'other'}
                    onChange={(ev) => setOption(ev.target.value)}
                    value={'other'}
                  />
                  Otros
                </label>
              </div>
              <p
                className={
                  option === 'other'
                    ? `${classes.check} fw-bold mb-4`
                    : `${classes.uncheck} fw-bold mb-4`
                }>
                Explique su respuesta
              </p>
              <InputTextarea
                rows={5}
                cols={30}
                value={details}
                onChange={(ev) => setDetails(ev.target.value)}
                autoResize
                disabled={option !== 'other'}
              />
            </Row>
            <input
              type='submit'
              value='Enviar'
              className={`${classes.button} mt-4`}
            />
            <Button
              variant='link'
              className={classes.buttonLink}
              onClick={handleCloseForm}>
              Cancelar
            </Button>
          </form>
        </Container>
        <ExploreBadge />
      </div>
    </>
  )
}
