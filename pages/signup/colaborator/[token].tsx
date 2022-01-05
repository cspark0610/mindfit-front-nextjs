// main tools
import Image from 'next/image'

// bootstrap components
import { Container } from 'react-bootstrap'

// components
import { FirstColaboratorLogin } from 'components/molecules/FirstColaboratorLogin'

// styles
import classes from 'styles/signup/colaborator.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { GetSSPropsType } from 'types'

const SignupOrgPage: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  content,
  token,
}) => {
  return (
    <Container className={classes.container}>
      <h1 className={classes.title}>{content.title}</h1>
      <div>
        <Image
          src='/assets/icon/MINDFIT.svg'
          alt='Mindfit Logo'
          width={420}
          height={150}
        />
      </div>
      <FirstColaboratorLogin token={token} content={content.login} />
    </Container>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const token = ctx.query.token as string
  const contentLoginCard = await import(
    '@public/jsons/firstColaboratorLogin/login.json'
  )

  return { props: { content: contentLoginCard.default, token } }
}

export default SignupOrgPage
