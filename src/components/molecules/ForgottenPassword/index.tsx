// Main tools
import { useState } from 'react'

// Styles
import classes from 'styles/Login/ForgottenPassword/forgottenPassword.module.scss'

// Components
import { InputText } from 'primereact/inputtext'
import { Row, Col, Button } from 'react-bootstrap'
import { AlertText } from 'components/atoms/AlertText'
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// Types
import { FC } from 'react'
import { ChangeType, SetStateType } from 'types'
import { SubmitType } from 'types/index'

//GQL
import { useMutation } from '@apollo/client'
import RESET_PASSWORD from 'lib/mutations/requestResetPassword.gql'

//commons
import { microServices } from 'commons'

interface Props {
  setToggleView: SetStateType<boolean>
  content: any
}

export const ForgottenPassword: FC<Props> = ({ setToggleView, content }) => {
  const [userEmail, setUserEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [requestedPassword, setRequestedPassword] = useState(false)

  const handleToggleChange = () => {
    setToggleView((currentValue) => !currentValue)
  }

  const handleChange = (ev: ChangeType) => {
    setUserEmail(ev.target.value.trim())
  }

  const [requestResetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      setShowError(false)
      setRequestedPassword(true)
    },
    onError: () => {
      setShowError(true)
      setRequestedPassword(false)
    },
    context: { ms: microServices.backend },
  })

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()
    try {
      requestResetPassword({ variables: { email: userEmail } })
    } catch (error) {
      console.error(error)
    }
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
              className={`${classes.marginInput} ${classes.input}`}
              value={userEmail}
              onChange={handleChange}
              placeholder={content.email.placeholder}
            />
            {showError && (
              <AlertText alertType='error' text='No se encuentra el usuario' />
            )}
            {requestedPassword && (
              <AlertText
                alertType='success'
                text='Email de recuperación enviado con éxito'
              />
            )}
          </Row>
          <Row>
            <Button type='submit' className={`my-5 ${classes.button}`}>
              {content.sendEmailButton}
            </Button>
          </Row>
          <p className={classes.recoveryLabel} onClick={handleToggleChange}>
            {content.login}
          </p>
          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
