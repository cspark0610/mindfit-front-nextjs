//main
import { useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
//components
import { InputText } from 'primereact/inputtext'
import { Button, Col, Row } from 'react-bootstrap'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { InputMask } from 'primereact/inputmask'
import { AlertText } from 'components/atoms/AlertText'
//styles
import classes from 'styles/VerifyUser/verifyUser.module.scss'
//types
import { SubmitType } from 'types'
//GQL
import { useMutation } from '@apollo/client'
import VERIFY_USER from 'lib/mutations/verifyUser.gql'
//commons
import { microServices } from 'commons'
import { setTimeout } from 'timers'

export const VerifyUserCard = () => {
  const [userEmail, setuserEmail] = useState('')
  const [verificationCode, setverificationCode] = useState('')
  const [alertTextValues, setalertTextValues] = useState({
    show: false,
    alertType: 'success' || 'error',
    text: '',
  })
  const session = useSession()

  useEffect(() => {
    if (session?.data?.user?.email) setuserEmail(session.data.user.email)
  }, [session])

  const [verifyUser] = useMutation(VERIFY_USER, {
    onCompleted: () => {
      setalertTextValues({
        show: true,
        alertType: 'success',
        text: 'Cuenta verificada con éxito',
      })
      setTimeout(() => {
        signOut({ callbackUrl: '/login' })
      }, 5000)
    },
    onError: (error) => {
      console.log({ ...error })
      let message = ''
      if (error.message === 'email should not be empty,email must be an email')
        message = 'El campo de email no puede estar vacio'
      if (error.message === 'Bad Request')
        message = 'El codigo es invalido o no existe el usuario'
      setalertTextValues({
        show: true,
        alertType: 'error',
        text: message,
      })
    },
    context: { ms: microServices.backend },
  })

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()
    let message = ''

    if (userEmail === '') {
      message = 'El email es requerido'
    } else if (verificationCode === '') {
      message = 'El codigo de verificación es requerido'
    }

    if (message !== '') {
      setalertTextValues({
        show: true,
        alertType: 'error',
        text: message,
      })
    } else {
      verifyUser({
        variables: {
          data: { email: userEmail, code: verificationCode },
        },
      })
    }
  }

  return (
    <Row className=''>
      <Col xs={12} className='d-flex justify-content-center'>
        <form
          onSubmit={handleSubmit}
          className={`${classes.card} ${classes.section}`}>
          <Row>
            <h3 className='text-center mb-3'>Verifica tu cuenta</h3>
          </Row>
          {session.status === 'unauthenticated' && (
            <Row>
              <InputText
                type='email'
                className={`${classes.marginInput} ${classes.input} mt-3`}
                value={userEmail}
                onChange={(e) => {
                  setuserEmail(e.target.value)
                }}
                placeholder='Tu direccion de Email'
              />
            </Row>
          )}
          <Row>
            <InputMask
              className={`${classes.InputMask} ${classes.marginInput} ${classes.input} mt-3`}
              mask='********'
              value={verificationCode}
              onChange={(e) => setverificationCode(e.value)}></InputMask>
          </Row>

          <Row>
            {alertTextValues.show && (
              <AlertText
                alertType={alertTextValues.alertType}
                text={alertTextValues.text}
              />
            )}
          </Row>
          <Row>
            <Button type='submit' className={`mt-3 ${classes.button}`}>
              Verificar
            </Button>
          </Row>
          <Row>
            <Button variant='text' className={`mb-3 mt-3 ${classes.button}`}>
              No he recibido el codigo
            </Button>
          </Row>

          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
