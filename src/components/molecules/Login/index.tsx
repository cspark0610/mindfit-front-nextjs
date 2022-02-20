// Main tools
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { signIn, getSession, getProviders } from 'next-auth/react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// utils
import { microServices } from 'commons'
import { coacheeRegistrationStatus, userRoles } from 'utils/enums'

// bootstrap components
import { Row, Col, Button } from 'react-bootstrap'

// prime components
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Skeleton } from 'primereact/skeleton'

// gql
import { useLazyQuery } from '@apollo/client'
import GET_COACHEE_BY_ID from 'lib/queries/Coachee/getById.gql'

//Styles
import classes from 'styles/Login/LoginCard/loginCard.module.scss'

// Types
import { FC } from 'react'
import { ClientSafeProvider } from 'next-auth/react'
import { AlertText } from 'components/atoms/AlertText'
import { ChangeType, SetStateType, SubmitType } from 'types'
import { Facebook, Google, Linkedin } from 'react-bootstrap-icons'

interface Props {
  content: any
  setToggleView: SetStateType<boolean>
}

export const LoginCard: FC<Props> = ({ setToggleView, content }) => {
  const { push } = useRouter()
  const [error, setError] = useState('')
  const [user, setUser] = useState({ email: '', password: '' })
  const [providers, setProviders] = useState<ClientSafeProvider[] | undefined>(
    undefined
  )

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
            push('/user')
          else push('/signup/coachee/steps')
        } else if (session.user.organization) push('/coachees/add')
      }
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

  const rrssIcons: { [key: string]: JSX.Element } = {
    google: <Google />,
    facebook: <Facebook />,
    linkedin: <Linkedin />,
  }

  return (
    <Row className={classes.container}>
      <Col xs={12} className='d-flex justify-content-center'>
        <form
          onSubmit={handleSubmit}
          className={`${classes.card} ${classes.section}`}>
          <Row>
            <InputText
              type='email'
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
