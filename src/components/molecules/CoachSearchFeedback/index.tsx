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
  content: any
}

export const CoachSearchFeedback: FC<CoachFeedbackInterface> = ({
  content,
  cancel,
  submit,
}) => {
  const [option, setOption] = useState('')
  const [details, setDetails] = useState('')
  // const checkboxOptions = ['firstOption', 'secondOption', 'other']

  console.log(content)

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
                  className='me-4'
                  checked={option === options.value}
                  onChange={handleOptionChange}
                  value={options}
                />
                {options.label}
              </label>
            ))}
          </div>
          <p>{content.suggestedCoachesTextarea.label}</p>
          <InputTextarea
            autoResize
            rows={8}
            placeholder={content.suggestedCoachesTextarea.placeholder}
            value={details}
            onChange={(ev) => setDetails(ev.target.value)}
            disabled={option !== 'other'}
            className={classes.textarea}
          />
          <Button type='submit' className={`${classes.button} mt-4`}>
            {content.suggestedCoachesSubmitButton.label}
          </Button>
          <Button
            variant='link'
            className={classes.buttonLink}
            onClick={cancel}>
            {content.suggestedCoachesCancelButton.label}
          </Button>
        </form>
      </Container>
      <ExploreBadge />
    </div>
  )
}
