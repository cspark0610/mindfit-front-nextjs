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
  submit: (reason: string) => void
  content: any
}

export const CoachSearchFeedback: FC<CoachFeedbackInterface> = ({
  content,
  cancel,
  submit,
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
    //else show a toast
  }

  return (
    <div className={classes.section}>
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
          <Button
            variant='link'
            onClick={cancel}
            className={classes.buttonLink}>
            {content.suggestedCoachesCancelButton.label}
          </Button>
        </form>
      </Container>
      <ExploreBadge />
    </div>
  )
}
