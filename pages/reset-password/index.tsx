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
import { initializeApolloClient } from 'lib/apollo'
import RESET_PASSWORD from 'lib/mutations/resetPassword.gql'
import CHANGE_PASSWORD_CONTENT from 'lib/strapi/queries/ChangePassword/page.gql'

//Utils
import { resetPasswordValidation } from 'utils/resetPasswordValidation'

const ChangePassword: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  suggestionsContent,
  hash,
}) => {
  // state declarations
  const [password, setPassword] = useState({
    password: '',
    confirmPassword: '',
  })
  const validation = resetPasswordValidation(hash as string, password, {
    requestChangeWarning: content.requestChangeWarning,
  })
  const { push } = useRouter()

  // mutation
  const [resetPassword] = useMutation(RESET_PASSWORD, {
    onCompleted: () => push('/'),
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
            <p className={`mb-4 ${classes.textDescription}`}>{content.title}</p>
            <Row>
              {console.log(suggestionsContent)}
              <Password
                toggleMask
                name='password'
                onChange={handleChange}
                className={`mb-4 px-0 `}
                promptLabel={suggestionsContent.promptLabel}
                value={password.password}
                weakLabel={suggestionsContent.weakLabel}
                strongLabel={suggestionsContent.strongLabel}
                mediumRegex={regex.minSize.source}
                inputClassName={classes.input}
                footer={(ev) =>
                  passwordSuggestionsTemplate({
                    value: ev.value as string,
                    suggestionsContent,
                  })
                }
                mediumLabel={suggestionsContent.fillFieldsLabel}
                placeholder={content.passwordInput.placeholder}
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
                placeholder={content.confirmPasswordInput.placeholder}
              />
            </Row>
            <Row>{validation.showAlert && <AlertText {...validation} />}</Row>
            <Row>
              <Button
                type='submit'
                className={`mt-5 ${classes.button}`}
                disabled={validation.alertType !== 'success'}>
                {content.submitButton.label}
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
  const apolloClient = initializeApolloClient()

  const { data } = await apolloClient.query({
    query: CHANGE_PASSWORD_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  const content = data.changePassword.data.attributes
  const suggestionsContent = content.passwordSuggestion.data.attributes

  const hash = ctx.query.token || ''

  return { props: { content, suggestionsContent, hash } }
}

export default ChangePassword
