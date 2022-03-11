// Main tools
import { useState } from 'react'

// Styles
import classes from 'styles/Login/page.module.scss'

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
  content: any
  setToggleView: SetStateType<boolean>
}

export const ForgottenPassword: FC<Props> = ({ setToggleView, content }) => {
  const [userEmail, setUserEmail] = useState('')
  const [showError, setShowError] = useState(false)
  const [requestedPassword, setRequestedPassword] = useState(false)

  const handleToggleChange = () =>
    setToggleView((currentValue) => !currentValue)

  const handleChange = (ev: ChangeType) => setUserEmail(ev.target.value.trim())

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
    <Row className={classes.form}>
      <Col sm={9}>
        <form onSubmit={handleSubmit} className={classes.section}>
          <Row>
            <InputText
              type='email'
              value={userEmail}
              onChange={handleChange}
              placeholder={content.emailInput.placeholder}
              className={`${classes.marginInput} ${classes.input}`}
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
            <Button type='submit' className={`my-4 ${classes.button}`}>
              {content.sendEmailButton.label}
            </Button>
          </Row>
          <p className={classes.label} onClick={handleToggleChange}>
            {content.haveAccountLabel}
          </p>
          <ExploreBadge />
        </form>
      </Col>
    </Row>
  )
}
