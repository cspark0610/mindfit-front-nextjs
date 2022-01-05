// Main tools
import { useState } from 'react'
import Image from 'next/image'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'
import { passwordSuggestionsTemplate } from 'components/atoms/PasswordSuggestionsTemplate'

// commons
import { regex } from 'commons'

// Styles
import { Password } from 'primereact/password'
import { Container, Row, Col, Button } from 'react-bootstrap'
import classes from 'styles/Login/ChangePassword/changePassword.module.scss'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { ChangeType, GetSSPropsType } from 'types'

const ChangePassword: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  const [password, setPassword] = useState({
    newPassword: '',
    repeatNewPassword: '',
  })

  const handleChange = (ev: ChangeType) => {
    setPassword({ ...password, [ev.target.name]: ev.target.value })
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
          <form className={`${classes.card} ${classes.section}`}>
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
              <Button className={`my-5 ${classes.button}`}>
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
