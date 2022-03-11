// Main tools
import { useState, FC } from 'react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// PrimeReact components
import { Checkbox } from 'primereact/checkbox'
import { InputTextarea } from 'primereact/inputtextarea'

// bootstrap components
import { Button, Container, Row } from 'react-bootstrap'

// Styles
import classes from 'styles/ChooseCoach/page.module.scss'

// types
import { SubmitType } from 'types'
import { CheckboxChangeParams } from 'primereact/checkbox'

interface CoachFeedbackInterface {
  content: any
  cancel: () => void
  submit: (reason: string) => void
}

export const CoachSearchFeedback: FC<CoachFeedbackInterface> = ({
  cancel,
  submit,
  content,
}) => {
  const [option, setOption] = useState<any>(null)
  const [details, setDetails] = useState('')

  const checkStylesValidation = (value: string) =>
    option === value ? classes.check : classes.uncheck

  const handleOptionChange = (ev: CheckboxChangeParams) =>
    setOption(ev.target.value)

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()
    if (option && option?.value !== 'other') submit(option.label)
    else if (option?.value === 'other' && details !== '') submit(details)
  }

  return (
    <div className={classes.feedback}>
      <h2 className={classes.title}>{content.suggestedCoachesTitle}</h2>
      <Container>
        <form onSubmit={handleSubmit}>
          <p className={classes.description}>
            {content.suggestedCoachesDescription}
          </p>
          <div className={`${classes.options} d-flex flex-column`}>
            {content.suggestedCoachesOptions.map((options: any) => (
              <label
                key={options.id}
                className={`${checkStylesValidation(options.value)} mb-3`}>
                <Checkbox
                  value={options}
                  className='me-4'
                  onChange={handleOptionChange}
                  checked={option?.value === options.value}
                />
                {options.label}
              </label>
            ))}
          </div>
          <p>{content.suggestedCoachesTextarea.label}</p>
          <InputTextarea
            rows={8}
            required
            autoResize
            value={details}
            className={classes.textarea}
            disabled={option?.value !== 'other'}
            onChange={(ev) => setDetails(ev.target.value)}
            placeholder={content.suggestedCoachesTextarea.placeholder}
          />
          <Button type='submit' className={`${classes.button} mt-4`}>
            {content.suggestedCoachesSubmitButton.label}
          </Button>
          <Row>
            <Button
              variant='link'
              onClick={cancel}
              className={classes.sugestBtn}>
              {content.suggestedCoachesCancelButton.label}
            </Button>
          </Row>
        </form>
      </Container>
      <ExploreBadge />
    </div>
  )
}
