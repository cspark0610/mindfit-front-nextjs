// Main tools
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, getProviders } from 'next-auth/react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'
import { XLg } from 'react-bootstrap-icons'

// prime components
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Skeleton } from 'primereact/skeleton'

//Styles
import classes from 'styles/Login/LoginCard/loginCard.module.scss'

// Types
import { ChangeType, SetStateType, SubmitType } from 'types'
import { ClientSafeProvider } from 'next-auth/react'
import { FC } from 'react'

interface Props {
  setToggleView: SetStateType<boolean>
  content: any
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
              placeholder={content.email.placeholder}
            />
          </Row>
          <Row className='mb-5'>
            <Password
              toggleMask
              feedback={false}
              name='password'
              inputClassName={`${classes.input}`}
              className='px-0'
              value={user.password}
              onChange={handleChange}
              placeholder={content.password.placeholder}
            />
          </Row>
          {error && (
            <Row>
              <strong className='p-error'>
                <XLg className='p-error' /> {error}
              </strong>
            </Row>
          )}
          <Row>
            <Button type='submit' className={`my-3 ${classes.button}`}>
              {content.loginButton}
            </Button>
          </Row>
          <p className={classes.recoveryLabel} onClick={handleToggleChange}>
            {content.passwordRecovery}
          </p>
          {!providers ? (
            <Skeleton width='100%' height='3rem' borderRadius='16px' />
          ) : (
            <Row>
              {providers?.map(
                (provider) =>
                  provider.id !== 'credentials' && (
                    <Button
                      key={provider.id}
                      onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                      className={`my-3 ${classes.button}`}>
                      {provider.name}
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
