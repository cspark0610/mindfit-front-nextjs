// main tools
import Image from 'next/image'

// bootstrap components
import { Button, Col, Container, Row } from 'react-bootstrap'
import { ChevronDoubleRight } from 'react-bootstrap-icons'

// components
import { Layout } from 'components/organisms/Layout'
import { ChatSession } from 'components/organisms/chatSession'

// styles
import classes from 'styles/CoacheeSession/coacheeSession.module.scss'

//GQL
import GET_SESSION_TOKEN from 'lib/queries/Session/GetCoacheeSessionTokens.gql'

// types
import { GetSSPropsType } from 'types'
import { NextPage, GetServerSidePropsContext } from 'next'
import dynamic from 'next/dynamic'
import { useQuery } from '@apollo/client'
import { microServices } from 'commons'
import { useState } from 'react'

const CoacheeSession: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachingSessionId,
}) => {
  const [sessionData, setSessionData] = useState({})

  //import Agora VideoCall
  const AgoraVideoCall = dynamic<any>(
    () =>
      import('components/molecules/AgoraVideoCall').then(
        (comp) => comp.AgoraVideoCall
      ),
    { ssr: false }
  )
  //Get rtc token and channel name
  useQuery(GET_SESSION_TOKEN, {
    variables: { id: 2.0 },
    context: { ms: microServices.backend },
    onCompleted: (data) => setSessionData(data),
  })

  return (
    <Layout>
      <Container>
        <Row className={classes.container}>
          <Col lg={6}>
            <Container className={classes.section}>
              <Row className={classes.row}>
                <Image
                  className={classes.avatar}
                  src='/assets/images/avatar.png'
                  width={150}
                  height={150}
                  alt='user avatar'
                />
                <h2 className={classes.title}>Katherine Smith</h2>
                <h4 className={classes.subtitle}>Especialista en Motivación</h4>
                <h5>Otras especializaciones</h5>
                <Row>
                  {[0, 1, 2, 3].map((item, idx) => (
                    <h6 key={idx}>
                      <ChevronDoubleRight className={classes.icon} />
                      Desarrollo de Liderazgo
                    </h6>
                  ))}
                </Row>
                <p className={classes.paragraph}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea.
                </p>
                <p className={classes.paragraph}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea.
                </p>
                <Button className={classes.button} variant='secondary'>
                  Ver más
                </Button>
                <Row>
                  <Image
                    src='/assets/images/video.png'
                    width={500}
                    height={300}
                    alt='video thumbnail'
                  />
                </Row>
              </Row>
            </Container>
          </Col>
          <Col lg={6}>
            {sessionData?.token && sessionData?.channel && <AgoraVideoCall />}

            {/* <ChatSession /> */}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return { props: { coachingSessionId: ctx.params?.id } }
}

export default CoacheeSession
