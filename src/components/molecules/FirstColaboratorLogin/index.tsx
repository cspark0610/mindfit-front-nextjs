// Main tools
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import jwt_decoder from 'jwt-decode'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'
import { XLg } from 'react-bootstrap-icons'

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

export const FirstColaboratorLogin: FC<{ token: string; content: any }> = ({
  token,
  content,
}) => {
  const [user, setUser] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const { query } = useRouter()
  const { minSize, hasLetters, hasNumbers, hasSpecials } = regexValidation(
    user.password
  )
  const disableButton = !minSize || !hasSpecials || (!hasLetters && !hasNumbers)

  const handleChange = (ev: ChangeType) => {
    setUser({ ...user, [ev.target.name]: ev.target.value })
  }

  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()
    // update password process with token

    signIn('credentials', { ...user, callbackUrl: '/signup/colaborator/steps' })
  }

  useEffect(() => {
    query.error && setError('Usuario o Contraseña incorrectos')
  }, [query])

  useEffect(() => {
    if (token) {
      try {
        const decoded: { email?: string } = jwt_decoder(token)
        if (decoded.email)
          setUser((user) => ({ ...user, email: decoded.email as string }))
        else setError('Solicite una invitacion para acceder')
      } catch (error) {
        setError('Solicite una invitacion para acceder')
      }
    }
  }, [token])

  return (
    <Row className={classes.container}>
      <Col xs={12} className='d-flex justify-content-center'>
        <form
          onSubmit={handleSubmit}
          className={`${classes.card} ${classes.section}`}>
          <Row>
            <InputText
              disabled={true}
              type='email'
              name='email'
              className={`mb-4 ${classes.input}`}
              value={user.email}
              onChange={handleChange}
              placeholder={content.email.placeholder}
            />
          </Row>
          <Row className='mb-5'>
            <Password
              toggleMask
              name='password'
              value={user.password}
              onChange={handleChange}
              disabled={error !== ''}
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
          {error && (
            <Row className='text-center'>
              <strong className='p-error'>
                <XLg className='p-error' /> {error}
              </strong>
            </Row>
          )}
          <Row>
            <Button
              disabled={error !== '' || disableButton}
              type='submit'
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
