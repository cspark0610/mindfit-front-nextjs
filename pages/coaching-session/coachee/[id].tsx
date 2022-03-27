// main tools
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// components
import { CoachProfileCard } from 'components/molecules/CoachProfileCard'
import { ChatSession } from 'components/organisms/chatSession'
import { Layout } from 'components/organisms/Layout'

// utils
import { microServices } from 'commons'

// styles
import classes from 'styles/CoacheeSession/coacheeSession.module.scss'

//GQL
import GET_SESSION_TOKEN from 'lib/queries/Session/GetCoacheeSessionTokens.gql'
import { useQuery } from '@apollo/client'

// types
import { NextPage, GetServerSidePropsContext } from 'next'
import { VideoCallProps } from 'types/components/Agora'
import { GetSSPropsType } from 'types'

const CoacheeSession: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachingSessionId,
}) => {
  const { data: session } = useSession()
  const [videoSession, setVideoSession] = useState<VideoCallProps>({
    channel: '',
    token: '',
    uid: 0,
  })

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
    variables: { id: parseFloat(`${coachingSessionId}.0`) },
    context: { ms: microServices.backend },
    onCompleted: (data) =>
      setVideoSession({
        channel: data.getCoacheeSessionTokens.videoSessionChannel,
        token: data.getCoacheeSessionTokens.tokens.rtcToken,
        uid: session?.user.sub as number,
      }),
  })

  return (
    <Layout>
      <Container className='my-5'>
        <Row className={classes.container}>
          <Col lg={4}>
            <CoachProfileCard />
          </Col>
          <Col lg={8}>
            {videoSession?.token !== '' && videoSession?.channel !== '' && (
              <AgoraVideoCall {...videoSession} />
            )}
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
