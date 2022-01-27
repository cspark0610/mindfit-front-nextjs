// Main tools
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'
import { AlertText } from 'components/atoms/AlertText'

// prime components
import { Password } from 'primereact/password'

// bootstrap components
import { Container, Row, Col, Button } from 'react-bootstrap'

// commons
import { microServices, regex } from 'commons'

// Styles
import classes from 'styles/Login/ChangePassword/changePassword.module.scss'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { ChangeType, GetSSPropsType, SubmitType } from 'types'

//Apollo
import { useMutation } from '@apollo/client'
import RESET_PASSWORD from 'lib/mutations/resetPassword.gql'

//Utils
import { resetPasswordValidation } from 'utils/resetPasswordValidation'

const ChangePassword: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  hash,
}) => {
  // state declarations
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  })
  const validation = resetPasswordValidation(hash as string, password)
  const { push } = useRouter()

  // mutation
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => push('/login'),
    onError: (err) => console.log(err),
    context: { ms: microServices.backend },
  })

  // handlers
  const handleChange = (ev: ChangeType) =>
    setPassword({ ...password, [ev.target.name]: ev.target.value })

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault()

    if (validation.alertType === 'success')
      resetPassword({ variables: { data: { ...password, hash } } })
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
                name='password'
                onChange={handleChange}
                className={`mb-4 px-0 `}
                promptLabel='Sugerencias'
                value={password.password}
                weakLabel='Contraseña muy corta'
                strongLabel='Contraseña aceptada'
                mediumRegex={regex.minSize.source}
                inputClassName={classes.input}
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
                className='px-0'
                name='confirmPassword'
                onChange={handleChange}
                value={password.confirmPassword}
                inputClassName={classes.input}
                placeholder={
                  content.changePassword.repeatNewPassword.placeholder
                }
              />
            </Row>
            <Row>{validation.showAlert && <AlertText {...validation} />}</Row>
            <Row>
              <Button
                disabled={validation.alertType !== 'success'}
                type='submit'
                className={`mt-5 ${classes.button}`}>
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
  const hash = ctx.query.token || ''

  return { props: { content: content.default, hash } }
}

export default ChangePassword
