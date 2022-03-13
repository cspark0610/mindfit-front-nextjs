// main tools
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useMutation } from '@apollo/client'

// bootstrap components
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { Check2, Question } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'

// components
import { UploadPicture } from 'components/atoms/UploadPicture'
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// utils
import { validateUserSignup } from 'components/organisms/Signup/utils'

// gql
import CREATE_USER from 'lib/mutations/Signup/createUser.gql'

// commons
import { microServices, regex } from 'commons'

// styles
import classes from 'styles/UI/Card/signupCard.module.scss'

// types
import { FC } from 'react'
import { ChangeType } from 'types'
import { UserDataType } from 'types/models/User'

interface Props {
  content: any
}

export const UserSignup: FC<Props> = ({ content }) => {
  const suggestionsContent = content.passwordSuggestion.data.attributes
  const [userData, setUserData] = useState<UserDataType>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (ev: ChangeType) =>
    setUserData({ ...userData, [ev.target.name]: ev.target.value })

  const handleSignup = () => {
    signIn('credentials', {
      email: userData.email,
      password: userData.password,
      callbackUrl: '/signup/organization',
    })
  }

  const handeSubmit = () => {
    signUp({
      variables: {
        data: {
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          password: userData.password,
        },
      },
    })
  }

  const [signUp] = useMutation(CREATE_USER, {
    onCompleted: handleSignup,
    onError: (error) => console.log(error),
    context: { ms: microServices.backend },
  })

  const overlayTooltip = () => (
    <Tooltip>{suggestionsContent.fillFieldsLabel}</Tooltip>
  )

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>{content.title}</h1>
      <UploadPicture setData={setUserData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12}>
            <InputText
              name='firstName'
              value={userData.firstName}
              onChange={handleChange}
              placeholder={content.firstNameInput.placeholder}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='lastName'
              value={userData.lastName}
              onChange={handleChange}
              placeholder={content.lastNameInput.placeholder}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='email'
              type='email'
              value={userData.email}
              onChange={handleChange}
              placeholder={content.emailInput.placeholder}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <Password
              toggleMask
              className='w-100'
              name='password'
              placeholder={content.passwordInput.placeholder}
              promptLabel={suggestionsContent.promptLabel}
              weakLabel={suggestionsContent.weakLabel}
              mediumLabel={suggestionsContent.mediumLabel}
              strongLabel={suggestionsContent.strongLabel}
              mediumRegex={content.mediumRegex}
              strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              value={userData.password}
              inputClassName={classes.input}
              onChange={handleChange}
              footer={(ev) =>
                passwordSuggestionsTemplate({
                  value: ev.value as string,
                  suggestionsContent,
                })
              }
            />
          </Col>
        </Row>
        <Row className={classes.row}>
          {validateUserSignup(userData) ? (
            <Col xs={12} sm={1} className={classes.mark}>
              <Check2 />
            </Col>
          ) : (
            <OverlayTrigger placement='bottom' overlay={overlayTooltip()}>
              <Col xs={12} sm={1} className={classes.mark}>
                <Question className={classes.tip} />
              </Col>
            </OverlayTrigger>
          )}
          <Col xs={12} sm={10}>
            <Button
              disabled={!validateUserSignup(userData)}
              onClick={handeSubmit}
              className={classes.button}>
              {content.submitButton.label}
            </Button>
          </Col>
        </Row>
        <ExploreBadge />
      </Container>
    </section>
  )
}
