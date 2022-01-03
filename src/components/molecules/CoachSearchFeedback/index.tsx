// Main tools
import { useState } from 'react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// PrimeReact components
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'

// Styles
import { Container, Row } from 'react-bootstrap'
import classes from 'styles/CoachSearchFeedback/coachSearchFeedback.module.scss'

// Type
import { FC } from 'react'

export const CoachSearchFeedback: FC = () => {
  const [option, setOption] = useState<String>('')
  const [details, setDetails] = useState<String>('')
  return (
    <div className={classes.section}>
      <h2 className='fw-bold fs-4 mb-5'>
        ¿No estás satisfecho con los coach sugeridos?
      </h2>
      <Container>
        <form>
          <Row>
            <p className='fs-5 mb-5'>Puedes indicarnos ¿por qué no?</p>
            <div>
              <label
                className={
                  option === 'firstOption'
                    ? `${classes.check} fw-bold mb-5`
                    : `${classes.uncheck} fw-bold mb-5`
                }>
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
          <input type='submit' className={`${classes.button} mt-4`} />
        </form>
      </Container>
      <ExploreBadge />
    </div>
  )
}
