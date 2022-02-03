// Main tools
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, getProviders } from 'next-auth/react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// prime components
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Skeleton } from 'primereact/skeleton'

//Styles
import classes from 'styles/Login/LoginCard/loginCard.module.scss'

// Types
import { FC } from 'react'
import { ClientSafeProvider } from 'next-auth/react'
import { AlertText } from 'components/atoms/AlertText'
import { ChangeType, SetStateType, SubmitType } from 'types'
import { Google } from 'react-bootstrap-icons'

interface Props {
  content: any
  setToggleView: SetStateType<boolean>
}

export const LoginCard: FC<Props> = ({ setToggleView, content }) => {
  const { query } = useRouter()
  const [error, setError] = useState('')
  const [user, setUser] = useState({ email: '', password: '' })
  const [providers, setProviders] = useState<ClientSafeProvider[] | undefined>(
    undefined
  )

  const handleChange = (ev: ChangeType) =>
    setUser({ ...user, [ev.target.name]: ev.target.value })

  const handleToggleChange = () =>
    setToggleView((currentValue) => !currentValue)

  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()
    signIn('credentials', { ...user, callbackUrl: '/' })
  }

  useEffect(() => {
    query.error && setError('Usuario o Contraseña incorrectos')
  }, [query])

  useEffect(() => {
    ;(async () => {
      const prov = await getProviders().then((res) =>
        Object.values(res as Record<string, ClientSafeProvider>)
      )
      setProviders(prov)
    })()
  }, [])

  return (
    <Row className={classes.container}>
      <Col xs={12} className='d-flex justify-content-center'>
        <form
          onSubmit={handleSubmit}
          className={`${classes.card} ${classes.section}`}>
          <Row>
            <InputText
              type={'email'}
              name='email'
              className={`mb-4 ${classes.input}`}
              value={user.email}
              onChange={handleChange}
              placeholder={content.emailInput.placeholder}
            />
          </Row>
          <Row className='mb-3'>
            <Password
              toggleMask
              feedback={false}
              name='password'
              inputClassName={`${classes.input}`}
              className='px-0'
              value={user.password}
              onChange={handleChange}
              placeholder={content.passwordInput.placeholder}
            />
          </Row>
          {error && (
            <Row>
              <AlertText alertType='error' text={error} />
            </Row>
          )}
          <Row>
            <Button type='submit' className={`my-3 ${classes.button}`}>
              {content.loginButton.label}
            </Button>
          </Row>
          <p className={classes.recoveryLabel} onClick={handleToggleChange}>
            {content.recoverPasswordLabel}
          </p>
          {!providers ? (
            <Skeleton width='100%' height='3rem' borderRadius='16px' />
          ) : (
            <Row>
              {providers?.map(
                (provider) =>
                  provider.id !== 'credentials' &&
                  provider.id !== 'createPassword' && (
                    <Button
                      key={provider.id}
                      variant='secondary'
                      onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                      className={`my-3 ${classes.button_icon}`}>
                      <Google />
                    </Button>
                  )
              )}
            </Row>
          )}
          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
