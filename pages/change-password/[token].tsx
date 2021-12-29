// Main tools
import { useState } from 'react'
import Image from 'next/image'

// Components
import { ExploreBadge } from 'components/atoms/ExploreBadge'

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
    <Container className='text-center'>
      <div>
        <Image
          className={classes.logo}
          src='/icon/MINDFIT.svg'
          alt='Mindfit Logo'
          width={500}
          height={250}
          layout='intrinsic'
        />
      </div>
      <>
        <Row>
          <Col xs={12} className='d-flex justify-content-center'>
            <form className={`${classes.card}`}>
              <Row>
                <Password
                  toggleMask
                  name='newPassword'
                  inputClassName={`${classes.input}`}
                  className={`mb-4 px-0 `}
                  value={password.newPassword}
                  onChange={handleChange}
                  placeholder={content.changePassword.newPassword.placeholder}
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
      </>
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const content = await import('@public/jsons/changePassword.json')

  return { props: { content: content.default } }
}

export default ChangePassword
