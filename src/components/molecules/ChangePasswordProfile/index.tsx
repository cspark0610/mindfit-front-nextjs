// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// prime components
import { Password } from 'primereact/password'

// components
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// commons
import { regex, regexValidation } from 'commons'

//gql
import { useMutation } from '@apollo/client'
import PASSWORD_DATA from 'lib/mutations/User/changePassword.gql'

// utils
import { savePassword } from 'utils/Profile/coacheeProfile'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType, SetStateType, SubmitType } from 'types'
import { UserDataType } from 'types/models/User'

export const ChangePasswordProfile: FC<{
  data: UserDataType
  content: any
  onHide: SetStateType<boolean>
}> = ({ data, content, onHide }) => {
  const suggestionsContent = content.passwordSuggestion.data.attributes
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: '',
  })

  const [NewPassword] = useMutation(PASSWORD_DATA)

  const handleChangePassword = (ev: ChangeType | any) =>
    setPasswordData({ ...passwordData, [ev.target.name]: ev.target.value })

  const { minSize, hasLetters, hasNumbers, hasSpecials } = regexValidation(
    passwordData.password
  )

  const disableButton =
    passwordData.password !== passwordData.confirmPassword ||
    !minSize ||
    !hasSpecials ||
    (!hasLetters && !hasNumbers)

  const changePassword = async (ev: SubmitType) => {
    ev.preventDefault()
    const { succes } = await savePassword(data, passwordData, NewPassword)
    if (succes) onHide(false)
  }

  return (
    <form onSubmit={changePassword}>
      <section className={classes.container}>
        <h1 className={classes.title}>{content.title}</h1>
        <Container fluid>
          <Row className={classes.row}>
            <Col xs={12}>
              <Password
                toggleMask
                name='password'
                value={passwordData.password}
                onChange={handleChangePassword}
                className='w-100'
                promptLabel={suggestionsContent.promptLabel}
                weakLabel={suggestionsContent.weakLabel}
                strongLabel={suggestionsContent.strongLabel}
                mediumRegex={regex.minSize.source}
                inputClassName={`${classes.input}`}
                placeholder={content.passwordInput.placeholder}
                mediumLabel={suggestionsContent.fillFieldsLabel}
                strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              />
            </Col>
            <Col xs={12}>
              <Password
                toggleMask
                feedback={false}
                className='w-100'
                name='confirmPassword'
                onChange={handleChangePassword}
                value={passwordData.confirmPassword}
                inputClassName={classes.input}
                placeholder={content.confirmPasswordInput.placeholder}
              />
            </Col>
            <Col xs={12}>
              {passwordSuggestionsTemplate({
                value: passwordData.password,
                suggestionsContent,
              })}
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs={12}>
              <Button
                type='submit'
                disabled={disableButton}
                className={classes.button}
                variant='secondary'>
                {content.submitButton.label}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </form>
  )
}
