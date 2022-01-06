// Main tools
import { useState } from 'react'
import Image from 'next/image'

// Components
import { ForgottenPassword } from 'components/molecules/ForgottenPassword'
import { LoginCard } from 'components/molecules/Login'

// bootstrap components
import { Container } from 'react-bootstrap'

// Styles
import classes from 'styles/Login/page.module.scss'

// Types
import { NextPage, GetServerSidePropsContext } from 'next'
import { GetSSPropsType } from 'types'

const LoginPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
}) => {
  const [toggleView, setToggleView] = useState(false)
  return (
    <Container className={classes.container}>
      <Image
        src='/assets/icon/MINDFIT.svg'
        alt='Mindfit Logo'
        width={420}
        height={250}
        layout='intrinsic'
      />
      {toggleView ? (
        <ForgottenPassword
          setToggleView={setToggleView}
          content={content.forgottenPassword}
        />
      ) : (
        <LoginCard setToggleView={setToggleView} content={content.login} />
      )}
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const contentLoginCard = await import('@public/jsons/loginCard.json')
  const contentForgottenPasword = await import(
    '@public/jsons/forgottenPassword.json'
  )

  return {
    props: {
      content: {
        ...contentLoginCard.default,
        ...contentForgottenPasword.default,
      },
    },
  }
}

export default LoginPage
