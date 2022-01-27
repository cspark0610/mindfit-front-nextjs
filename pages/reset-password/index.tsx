// Main tools
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'
import { AlertText } from 'components/atoms/AlertText'

// commons
import { microServices, regex } from 'commons'

// Styles
import { Password } from 'primereact/password'
import { Container, Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/Login/ChangePassword/changePassword.module.scss'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { ChangeType, GetSSPropsType, SubmitType } from 'types'
import { useRouter } from 'next/router'

//Apollo
import { useMutation } from '@apollo/client'
import RESET_PASSWORD from 'lib/mutations/resetPassword.gql'

//Utils
import { resetPasswordValidation } from 'utils/resetPasswordValidation'

const ChangePassword: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  //state declarations
  const [password, setPassword] = useState({
    newPassword: '',
    repeatNewPassword: '',
  })

  const [passwordError, setPasswordError] = useState({
    error: false,
    showAlert: false,
    text: 'Algo malió sal',
  })

  //Required token and email
  const queryValues = useRouter().query

  //password validation
  const [validation, setValidation] = useState(
    resetPasswordValidation(password.newPassword, password.repeatNewPassword)
  )

  //mutation
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      setPasswordError({
        error: false,
        showAlert: true,
        text: 'Contraseña cambiada con éxito',
      })
    },
    onError: () => {
      setPasswordError({
        error: true,
        showAlert: true,
        text: 'No se encuentra el usuario o no está activo',
      })
    },
    context: { ms: microServices.backend },
  })

  useEffect(() => {
    if (!validation.isValid) {
      setPasswordError({
        error: !validation.isValid,
        showAlert: true,
        text: validation.message || '',
      })
    } else {
      setPasswordError({
        error: false,
        showAlert: false,
        text: validation?.message || '',
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password.newPassword, password.repeatNewPassword])

  //handlers
  const handleChange = (ev: ChangeType) => {
    setPassword({ ...password, [ev.target.name]: ev.target.value })
    if (ev.target.name === 'newPassword') {
      setValidation(
        resetPasswordValidation(ev.target.value, password.repeatNewPassword)
      )
    } else {
      setValidation(
        resetPasswordValidation(password.newPassword, ev.target.value)
      )
    }
  }

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()

    if (validation.isValid && queryValues?.email && queryValues?.token) {
      resetPassword({
        variables: {
          data: {
            email: queryValues.email,
            hash: queryValues.token,
            password: password.newPassword,
            confirmPassword: password.repeatNewPassword,
          },
        },
      })
    }
  }

  return (
    <Container className={classes.pageContainer}>
      <Image
        src='/assets/icon/MINDFIT.svg'
        alt='Mindfit Logo'
        width={420}
        height={250}
        layout='intrinsic'
      />
      <Row className={classes.container}>
        <Col xs={12} className='d-flex justify-content-center'>
          <form
            onSubmit={handleSubmit}
            className={`${classes.card} ${classes.section}`}>
            <p className={`mb-4 ${classes.textDescription}`}>
              Cambio de contraseña
            </p>
            <Row>
              <Password
                toggleMask
                name='newPassword'
                onChange={handleChange}
                className={`mb-4 px-0 `}
                promptLabel='Sugerencias'
                value={password.newPassword}
                weakLabel='Contraseña muy corta'
                strongLabel='Contraseña aceptada'
                mediumRegex={regex.minSize.source}
                inputClassName={`${classes.input}`}
                footer={passwordSuggestionsTemplate}
                mediumLabel='Por favor, tenga en cuenta las sugerencias'
                placeholder={content.changePassword.newPassword.placeholder}
                strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              />
            </Row>
            <Row>
              <Password
                toggleMask
                feedback={false}
                name='repeatNewPassword'
                inputClassName={`${classes.input}`}
                className='px-0'
                value={password.repeatNewPassword}
                onChange={handleChange}
                placeholder={
                  content.changePassword.repeatNewPassword.placeholder
                }
              />
            </Row>
            <Row>
              {passwordError.showAlert === true && (
                <AlertText
                  alertType={passwordError.error ? 'error' : 'success'}
                  text={passwordError.text}
                />
              )}
            </Row>
            <Row>
              <Button
                disabled={!validation.isValid}
                type='submit'
                className={`my-5 ${classes.button}`}>
                {content.changePassword.changuePasswordButton}
              </Button>
            </Row>
            <ExploreBadge />
          </form>
        </Col>
      </Row>
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const content = await import('@public/jsons/changePassword.json')

  return { props: { content: content.default } }
}

export default ChangePassword
