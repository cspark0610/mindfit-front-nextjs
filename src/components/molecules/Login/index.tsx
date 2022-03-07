// Main tools
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { signIn, getSession, getProviders } from 'next-auth/react'

// Components
import { AlertText } from 'components/atoms/AlertText'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import { microServices } from 'commons'
import { coacheeRegistrationStatus, userRoles } from 'utils/enums'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'
import { Facebook, Google, Linkedin } from 'react-bootstrap-icons'

// prime components
import { Password } from 'primereact/password'
import { Skeleton } from 'primereact/skeleton'
import { InputText } from 'primereact/inputtext'

// gql
import { useLazyQuery } from '@apollo/client'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'

//Styles
import classes from 'styles/Login/page.module.scss'

// Types
import { FC } from 'react'
import { ClientSafeProvider } from 'next-auth/react'
import { ChangeType, SetStateType, SubmitType } from 'types'

interface LoginCardProps {
  content: any
  setToggleView: SetStateType<boolean>
}

export const LoginCard: FC<LoginCardProps> = ({ setToggleView, content }) => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [user, setUser] = useState({ email: '', password: '' })
  const [providers, setProviders] = useState<ClientSafeProvider[] | undefined>(
    undefined
  )
  const rrssIcons: { [key: string]: JSX.Element } = {
    google: <Google />,
    facebook: <Facebook />,
    linkedin: <Linkedin />,
  }

  const handleChange = (ev: ChangeType) =>
    setUser({ ...user, [ev.target.name]: ev.target.value })

  const handleToggleChange = () =>
    setToggleView((currentValue) => !currentValue)

  const handleSubmit = async (ev: SubmitType) => {
    ev.preventDefault()
    const data: any = await signIn('credentials', { ...user, redirect: false })
    if (data?.error) setError('Usuario o Contraseña incorrectos')
    else {
      const session = await getSession()

      if (session?.user.role === userRoles.COACHEE) {
        if (session.user.coachee) {
          const { data } = await getCoacheeById({
            variables: { id: session?.user.coachee?.id },
          })

          const status = [
            coacheeRegistrationStatus.REGISTRATION_COMPLETED,
            coacheeRegistrationStatus.COACH_APPOINTMENT_PENDING,
          ]

          if (
            status.includes(data.findCoacheeById.registrationStatus as string)
          )
            push('/dashboard/coachee')
          else push('/signup/coachee/steps')
        } else if (session.user.organization) push('/coachees/add')
      } else if (session?.user.role === userRoles.COACH)
        push('/dashboard/coach')
    }
  }

  const [getCoacheeById] = useLazyQuery(GET_COACHEE_BY_ID, {
    context: { ms: microServices.backend },
  })

  useEffect(() => {
    ;(async () => {
      const prov = await getProviders().then((res) =>
        Object.values(res as Record<string, ClientSafeProvider>)
      )
      setProviders(prov)
    })()
  }, [])

  return (
    <Row className={classes.form}>
      <Col sm={9}>
        <form onSubmit={handleSubmit} className={classes.section}>
          <Row>
            <InputText
              type='email'
              name='email'
              value={user.email}
              onChange={handleChange}
              className={`mb-4 ${classes.input}`}
              placeholder={content.emailInput.placeholder}
            />
          </Row>
          <Row className='mb-3'>
            <Password
              toggleMask
              name='password'
              className='px-0'
              feedback={false}
              value={user.password}
              onChange={handleChange}
              inputClassName={classes.input}
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
          <p className={classes.label} onClick={handleToggleChange}>
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
                      {rrssIcons[provider.id] ?? null}
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
