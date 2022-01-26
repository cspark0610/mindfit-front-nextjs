// Main tools
import { useState } from 'react'
import Image from 'next/image'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'
import { AlertText } from 'components/atoms/AlertText'

// commons
import { microServices, regex, regexValidation } from 'commons'

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

const ChangePassword: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  const [password, setPassword] = useState({
    newPassword: '',
    repeatNewPassword: '',
  })
  const [queryError, setqueryError] = useState({
    error: false,
    showAlert: false,
  })
  const [alertTextValues, setalertTextValues] = useState({
    alertType: 'error',
    text: 'Opps',
  })
  const queryValues = useRouter().query

  const handleChange = (ev: ChangeType) => {
    setPassword({ ...password, [ev.target.name]: ev.target.value })
  }

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => {
      setqueryError({
        error: false,
        showAlert: true,
      })
      setalertTextValues({
        alertType: 'success',
        text: 'Contraseña cambiada con éxito',
      })
    },
    onError: () => {
      setqueryError({
        error: true,
        showAlert: true,
      })
    },
    context: { ms: microServices.backend },
  })

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()
    //no send empty
    if (password.newPassword !== '' && password.repeatNewPassword !== '') {
      //no send diff
      if (password.newPassword === password.repeatNewPassword) {
        const { minSize, hasLetters, hasNumbers, hasSpecials } =
          regexValidation(password.newPassword)
        //validate chars
        if (minSize && hasLetters && hasNumbers && hasSpecials) {
          //send
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
        } else {
          setalertTextValues({
            alertType: 'error',
            text: 'Las contraseñas no cumplen los requerimientos',
          })
          setqueryError({
            error: true,
            showAlert: true,
          })
        }
      } else {
        setalertTextValues({
          alertType: 'error',
          text: 'Las contraseñas no coinciden',
        })
        setqueryError({
          error: true,
          showAlert: true,
        })
      }
    } else {
      setalertTextValues({
        alertType: 'error',
        text: 'Los campos de contraseña no pueden quedar vacios',
      })
      setqueryError({
        error: true,
        showAlert: true,
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
              {queryError.error === true && queryError.showAlert === true && (
                <AlertText
                  alertType={alertTextValues.alertType}
                  text={alertTextValues.text}
                />
              )}
            </Row>
            <Row>
              <Button
                disabled={
                  password.newPassword === '' &&
                  password.repeatNewPassword === ''
                    ? true
                    : false
                }
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
