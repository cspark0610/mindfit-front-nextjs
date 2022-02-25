// main tools
import { useState } from 'react'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// prime components
import { Password } from 'primereact/password'

// components
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// commons
import { microServices, regex, regexValidation } from 'commons'

//gql
import { useMutation } from '@apollo/client'
import PASSWORD_DATA from 'lib/mutations/User/changePassword.gql'

// styles
import classes from 'styles/Profile/profile.module.scss'

// types
import { FC } from 'react'
import { ChangeType, SetStateType, SubmitType } from 'types'
import { UserDataType } from 'types/models/User'

export const ChangePasswordProfile: FC<{
  content: any
  user: UserDataType
  onHide: SetStateType<boolean>
}> = ({ user, content, onHide }) => {
  const suggestionsContent = content.passwordSuggestion.data.attributes
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  })
  const { minSize, hasLetters, hasNumbers, hasSpecials } = regexValidation(
    password.password
  )

  const disableButton =
    !minSize ||
    !hasSpecials ||
    (!hasLetters && !hasNumbers) ||
    password.password !== password.confirmPassword

  const [UpdatePassword] = useMutation(PASSWORD_DATA, {
    context: { ms: microServices.backend },
    onCompleted: () => onHide(false),
  })

  const handleChangePassword = (ev: ChangeType | any) =>
    setPassword({ ...password, [ev.target.name]: ev.target.value })

  const changePassword = async (ev: SubmitType) => {
    ev.preventDefault()
    await UpdatePassword({
      variables: { id: user.sub, data: { password: password.password } },
    })
  }

  return (
    <form onSubmit={changePassword}>
      <section className={classes.container}>
        <h1 className={classes.title}>{content.title}</h1>
        <Container fluid>
          <Row className={classes.row}>
            <Col xs={12}>
              <Password
                required
                toggleMask
                name='password'
                className='w-100'
                value={password.password}
                onChange={handleChangePassword}
                mediumRegex={regex.minSize.source}
                inputClassName={`${classes.input}`}
                weakLabel={suggestionsContent.weakLabel}
                promptLabel={suggestionsContent.promptLabel}
                strongLabel={suggestionsContent.strongLabel}
                placeholder={content.passwordInput.placeholder}
                mediumLabel={suggestionsContent.fillFieldsLabel}
                strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              />
            </Col>
            <Col xs={12}>
              <Password
                required
                toggleMask
                feedback={false}
                className='w-100'
                name='confirmPassword'
                onChange={handleChangePassword}
                value={password.confirmPassword}
                inputClassName={classes.input}
                placeholder={content.confirmPasswordInput.placeholder}
              />
            </Col>
            <Col xs={12}>
              {passwordSuggestionsTemplate({
                value: password.password,
                suggestionsContent,
              })}
            </Col>
          </Row>
          <Row className={classes.row}>
            <Col xs={12}>
              <Button
                type='submit'
                disabled={disableButton}
                className={classes.button}>
                {content.submitButton.label}
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </form>
  )
}
