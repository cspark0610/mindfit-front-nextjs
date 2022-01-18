// Main tools
import { useState } from 'react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

// Styles
import { InputText } from 'primereact/inputtext'
import { Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/Login/ForgottenPassword/forgottenPassword.module.scss'

// Types
import { ChangeType, SetStateType } from 'types'
import { FC } from 'react'
import { useMutation } from '@apollo/client'
import RESET_PASSWORD from 'lib/mutations/resetPassword.gql'
import { validateEmail } from 'utils/validateEmail'

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
    onCompleted: ({ requestedResetPassword }) => {
      console.log('holi', requestedResetPassword)
      setShowError(false)
      setRequestedPassword(requestedResetPassword)
    },
    onError: () => {
      setShowError(true)
      setRequestedPassword(false)
    },
  })

  const handleSubmit = (e: any) => {
    e.preventDefault()
    try {
      if (validateEmail(userEmail))
        requestResetPassword({ variables: { email: userEmail } })
    } catch (error) {
      console.log(error)
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
              className={`${classes.marginInput} ${classes.input}`}
              value={userEmail}
              onChange={handleChange}
              placeholder={content.email.placeholder}
            />
            {showError && (
              <span className={classes.errorText}>
                Error: No se encuentra el usuario
              </span>
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
