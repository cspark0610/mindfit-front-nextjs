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

interface Props {
  setToggleView: SetStateType<boolean>
  content: any
}

export const ForgottenPassword: FC<Props> = ({ setToggleView, content }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleToggleChange = () => {
    setToggleView((currentValue) => !currentValue)
  }

  const handleChange = (ev: ChangeType) => {
    setUser({ ...user, [ev.target.name]: ev.target.value })
  }

  return (
    <>
      <Row>
        <Col xs={12} className='d-flex justify-content-center'>
          <form className={`${classes.card} ${classes.section}`}>
            <Row>
              <InputText
                name='email'
                className={`${classes.marginInput} ${classes.input}`}
                value={user.email}
                onChange={handleChange}
                placeholder={content.email.placeholder}
              />
            </Row>
            <Row>
              <Button className={`my-5 ${classes.button}`}>
                {content.sendEmailButton}
              </Button>
            </Row>
            <p className={classes.textMargin} onClick={handleToggleChange}>
              {content.login}
            </p>
            <ExploreBadge />
          </form>
        </Col>
      </Row>
    </>
  )
}
