// Main tools
import { useState, useEffect } from 'react'
import { signIn } from 'next-auth/react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// prime components
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'

// commons
import { regex, regexValidation } from 'commons'

//Styles
import classes from 'styles/Login/LoginCard/loginCard.module.scss'

// Types
import { ChangeType, SubmitType } from 'types'
import { FC } from 'react'
import { AlertText } from 'components/atoms/AlertText'

export const FirstColaboratorLogin: FC<{
  hash: string
  error: string
  content: any
}> = ({ hash, error, content }) => {
  const [data, setData] = useState({ hash, password: '', confirmPassword: '' })
  const [errorMessage, setErrorMessage] = useState(error)

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
    // update password process with hash
    signIn('createPassword', {
      ...data,
      callbackUrl: '/signup/colaborator/steps',
    })
  }

  useEffect(() => {
    !hash && setErrorMessage('Solicite una invitacion para acceder')
  }, [hash])

  return (
    <Row className={classes.container}>
      <Col xs={12} className='d-flex justify-content-center'>
        <form
          onSubmit={handleSubmit}
          className={`${classes.card} ${classes.section}`}>
          <Row>
            <InputText
              disabled={true}
              type='password'
              name='hash'
              className={`mb-4 ${classes.input}`}
              value={data.hash}
              onChange={handleChange}
              placeholder={content.email.placeholder}
            />
          </Row>
          <Row>
            <Password
              toggleMask
              name='password'
              value={data.password}
              onChange={handleChange}
              className={`mb-4 px-0 `}
              promptLabel='Sugerencias'
              weakLabel='Contraseña muy corta'
              strongLabel='Contraseña aceptada'
              mediumRegex={regex.minSize.source}
              inputClassName={`${classes.input}`}
              footer={passwordSuggestionsTemplate}
              placeholder={content.password.placeholder}
              mediumLabel='Por favor, tenga en cuenta las sugerencias'
              strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
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
              placeholder='Confirmar contraseña'
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
              {content.loginButton}
            </Button>
          </Row>
          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
