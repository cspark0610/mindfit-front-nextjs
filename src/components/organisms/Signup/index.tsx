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
  contentForm: any
}

export const UserSignup: FC<Props> = ({ content, contentForm }) => {
  const [userData, setUserData] = useState<UserDataType>({
    profilePicture: {} as File,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const label = {
    firstName: contentForm.input1,
    lasttName: contentForm.input2,
    email: contentForm.input3,
    password: contentForm.input4,
  }

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
    createUser({
      variables: {
        user: {
          email: userData.email,
          name: `${userData.firstName} ${userData.lastName}`,
          password: userData.password,
        },
      },
    })
  }

  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: handleSignup,
    onError: (error) => console.log(error),
    context: { ms: microServices.backend },
  })

  const overlayTooltip = () => <Tooltip>{content.fillFields}</Tooltip>

  return (
    <section className={classes.container}>
      <h1 className={classes.title}>{contentForm.title}</h1>
      <UploadPicture setData={setUserData} />
      <Container fluid>
        <Row className={classes.row}>
          <Col xs={12}>
            <InputText
              name='firstName'
              value={userData.firstName}
              onChange={handleChange}
              placeholder={label.firstName}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='lastName'
              value={userData.lastName}
              onChange={handleChange}
              placeholder={label.lasttName}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <InputText
              name='email'
              type='email'
              value={userData.email}
              onChange={handleChange}
              placeholder={label.email}
              className={classes.input}
            />
          </Col>
          <Col xs={12}>
            <Password
              toggleMask
              className='w-100'
              name='password'
              placeholder={label.password}
              promptLabel={content.promptLabel}
              weakLabel={content.weakLabel}
              mediumLabel={content.mediumLabel}
              strongLabel={content.strongLabel}
              mediumRegex={content.mediumRegex}
              strongRegex={`^((${regex.hasLetters.source}${regex.hasSpecials.source})|(${regex.hasNumbers.source}${regex.hasSpecials.source}))(${regex.minSize.source})`}
              value={userData.password}
              inputClassName={classes.input}
              footer={passwordSuggestionsTemplate}
              onChange={handleChange}
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
              {contentForm.button.label}
            </Button>
          </Col>
        </Row>
        <ExploreBadge />
      </Container>
    </section>
  )
}
