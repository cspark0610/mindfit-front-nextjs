// Main tools
import { useState, FC } from 'react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// PrimeReact components
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'

// bootstrap components
import { Button, Container } from 'react-bootstrap'

// Styles
import classes from 'styles/CoachSearchFeedback/coachSearchFeedback.module.scss'

// types
import { SubmitType } from 'types'
import { CheckboxChangeParams } from 'primereact/checkbox'

interface CoachFeedbackInterface {
  cancel: () => void
  submit: () => void
}

export const CoachSearchFeedback: FC<CoachFeedbackInterface> = ({
  cancel,
  submit,
}) => {
  const [option, setOption] = useState('')
  const [details, setDetails] = useState('')

  const checkStylesValidation = (value: string) =>
    option === value ? classes.check : classes.uncheck

  const handleOptionChange = (ev: CheckboxChangeParams) =>
    setOption(ev.target.value)

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()
    if (option !== '') submit()
    //else show a toast
  }

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>
        ¿No estás satisfecho con los coach sugeridos?
      </h2>
      <Container>
        <form onSubmit={handleSubmit}>
          <p className={classes.description}>Puedes indicarnos ¿por qué no?</p>
          <div className={classes.options}>
            <label className={checkStylesValidation('firstOption')}>
              <Checkbox
                className='me-4'
                checked={option === 'firstOption'}
                onChange={handleOptionChange}
                value='firstOption'
              />
              No estoy identificado con los coach mostrados.
            </label>
          </div>
          <div className={classes.options}>
            <label className={checkStylesValidation('secondOption')}>
              <Checkbox
                className='me-4'
                checked={option === 'secondOption'}
                onChange={handleOptionChange}
                value='secondOption'
              />
              Ninguno aborda mi debilidad a trabajar.
            </label>
          </div>
          <div className={classes.options}>
            <label className={checkStylesValidation('other')}>
              <Checkbox
                className='me-4'
                checked={option === 'other'}
                onChange={handleOptionChange}
                value={'other'}
              />
              Otros
            </label>
          </div>
          <p>Explique su respuesta</p>
          <InputTextarea
            autoResize
            rows={8}
            value={details}
            onChange={(ev) => setDetails(ev.target.value)}
            disabled={option !== 'other'}
            className={classes.textarea}
          />
          <Button type='submit' className={`${classes.button} mt-4`}>
            Enviar
          </Button>
          <Button
            variant='link'
            className={classes.buttonLink}
            onClick={cancel}>
            Cancelar
          </Button>
        </form>
      </Container>
      <ExploreBadge />
    </div>
  )
}
