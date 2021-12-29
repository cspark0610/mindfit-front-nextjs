// Main tools
import { useState } from 'react'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

//Styles
import { Password } from 'primereact/password'
import { InputText } from 'primereact/inputtext'
import { Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/Login/LoginCard/loginCard.module.scss'

// Types
import { ChangeType, SetStateType } from 'types'
import { FC } from 'react'

interface Props {
  setToggleView: SetStateType<boolean>
  content: any
}

export const LoginCard: FC<Props> = ({ setToggleView, content }) => {
  const [user, setUser] = useState({ email: '', password: '' })

  const handleChange = (ev: ChangeType) => {
    setUser({ ...user, [ev.target.name]: ev.target.value })
  }

  const handleToggleChange = () => {
    setToggleView((currentValue) => !currentValue)
  }

  return (
    <>
      <Row>
        <Col xs={12} className='d-flex justify-content-center'>
          <form className={classes.card}>
            <Row>
              <InputText
                type={'email'}
                name='email'
                className={`mb-4 ${classes.input}`}
                value={user.email}
                onChange={handleChange}
                placeholder={content.email.placeholder}
              />
            </Row>
            <Row>
              <Password
                toggleMask
                feedback={false}
                name='password'
                inputClassName={`${classes.input}`}
                className='px-0'
                value={user.password}
                onChange={handleChange}
                placeholder={content.password.placeholder}
              />
            </Row>
            <Row>
              <Button className={`my-5 ${classes.button}`}>
                {content.loginButton}
              </Button>
            </Row>
            <p className={classes.textMargin} onClick={handleToggleChange}>
              {content.passwordRecovery}
            </p>
            <ExploreBadge />
          </form>
        </Col>
      </Row>
    </>
  )
}
