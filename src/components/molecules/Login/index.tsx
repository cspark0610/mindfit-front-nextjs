// Main tools
import { signIn, getSession, getProviders } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { AlertText } from 'components/atoms/AlertText'

// utils
import { coacheeRegistrationStatus, userRoles } from 'utils/enums'
import { microServices } from 'commons'

// bootstrap components
import { Facebook, Google, Linkedin } from 'react-bootstrap-icons'
import { Row, Col, Button, Spinner } from 'react-bootstrap'

// prime components
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Skeleton } from 'primereact/skeleton'

// gql
import GET_COACHEE_PROFILE from 'lib/queries/Coachee/getCoacheeProfile.gql'
import { useLazyQuery } from '@apollo/client'

//Styles
import classes from 'styles/Login/page.module.scss'

// Types
import { ChangeType, SetStateType, SubmitType } from 'types'
import { ClientSafeProvider } from 'next-auth/react'
import { FC } from 'react'

interface LoginCardProps {
  setToggleView: SetStateType<boolean>
  content: any
}

export const LoginCard: FC<LoginCardProps> = ({ setToggleView, content }) => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({ email: '', password: '' })
  const [providers, setProviders] = useState<ClientSafeProvider[] | undefined>(
    undefined
  )
  const rrssIcons: { [key: string]: JSX.Element } = {
    google: <Google />,
    facebook: <Facebook />,
    linkedin: <Linkedin />,
  }

  const [getCoachee] = useLazyQuery(GET_COACHEE_PROFILE, {
    context: { ms: microServices.backend },
  })

  const handleChange = (ev: ChangeType) =>
    setUser({ ...user, [ev.target.name]: ev.target.value })

  const handleToggleChange = () =>
    setToggleView((currentValue) => !currentValue)

  const handleSubmit = async (ev: SubmitType) => {
    ev.preventDefault()
    setLoading(true)
    const data: any = await signIn('credentials', { ...user, redirect: false })
    if (data?.error) setError('Usuario o Contraseña incorrectos')
    else {
      const session = await getSession()

      if (session?.user.role?.includes(userRoles.COACHEE)) {
        const { data } = await getCoachee()

        const status = [
          coacheeRegistrationStatus.REGISTRATION_COMPLETED,
          coacheeRegistrationStatus.COACH_APPOINTMENT_PENDING,
        ]

        if (
          [userRoles.COACHEE_ADMIN, userRoles.COACHEE_OWNER].includes(
            session.user.role as string
          )
        )
          push('/dashboard/organization')
        else if (
          status.includes(data.getCoacheeProfile.registrationStatus as string)
        )
          push('/dashboard/coachee')
        else push('/signup/coachee/steps')
      } else if (session?.user.role === userRoles.COACH)
        push('/dashboard/coach')
    }
    setLoading(false)
  }

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
              {loading ? (
                <Spinner animation='border' />
              ) : (
                content.loginButton.label
              )}
            </Button>
          </Row>
          <p className={classes.label} onClick={handleToggleChange}>
            {content.recoverPasswordLabel}
          </p>
          {/**Inicio de session con Google
            !providers ? (
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
          )**/}
          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
