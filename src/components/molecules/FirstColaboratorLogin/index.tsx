// Main tools
import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'

// Components
import { AlertText } from 'components/atoms/AlertText'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// prime components
import { Password } from 'primereact/password'

// commons
import { regex, regexValidation } from 'commons'

//Styles
import classes from 'styles/signup/coachee.module.scss'

// Types
import { FC } from 'react'
import { ChangeType, SubmitType } from 'types'

type FirstColaboratorLoginProps = {
  hash: string
  error: string
  content: any
}

export const FirstColaboratorLogin: FC<FirstColaboratorLoginProps> = ({
  hash,
  error,
  content,
}) => {
  const [errorMessage, setErrorMessage] = useState(error)
  const suggestionsContent = content.passwordSuggestion.data.attributes
  const [data, setData] = useState({ hash, password: '', confirmPassword: '' })

  const { minSize, hasLetters, hasNumbers, hasSpecials } = regexValidation(
    data.password
  )
  const disableButton =
    data.password !== data.confirmPassword ||
    !minSize ||
    !hasSpecials ||
    (!hasLetters && !hasNumbers)

  const handleChange = (ev: ChangeType) =>
    setData({ ...data, [ev.target.name]: ev.target.value })

  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()
    if (!disableButton)
      signIn('createPassword', {
        ...data,
        callbackUrl: '/signup/coachee/steps',
      })
  }

  useEffect(() => {
    !hash && setErrorMessage('Solicite una invitacion para acceder')
  }, [hash])

  return (
    <Row className={classes.form}>
      <Col sm={9}>
        <form onSubmit={handleSubmit} className={classes.section}>
          <Row>
            <Password
              toggleMask
              name='password'
              className='mb-4 px-0'
              value={data.password}
              onChange={handleChange}
              mediumRegex={regex.minSize.source}
              inputClassName={`${classes.input}`}
              weakLabel={suggestionsContent.weakLabel}
              promptLabel={suggestionsContent.promptLabel}
              strongLabel={suggestionsContent.strongLabel}
              mediumLabel={suggestionsContent.mediumLabel}
              placeholder={content.passwordInput.placeholder}
              strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              footer={(ev) =>
                passwordSuggestionsTemplate({
                  value: ev.value as string,
                  suggestionsContent,
                })
              }
            />
          </Row>
          <Row>
            <Password
              toggleMask
              feedback={false}
              className='mb-2 px-0'
              name='confirmPassword'
              onChange={handleChange}
              value={data.confirmPassword}
              inputClassName={classes.input}
              placeholder={content.confirmPasswordInput.placeholder}
            />
          </Row>
          {errorMessage && (
            <Row className='text-center'>
              <AlertText alertType='error' text={errorMessage} />
            </Row>
          )}
          <Row>
            <Button
              type='submit'
              disabled={disableButton}
              className={`my-3 ${classes.button}`}>
              {content.submitButton.label}
            </Button>
          </Row>
          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
