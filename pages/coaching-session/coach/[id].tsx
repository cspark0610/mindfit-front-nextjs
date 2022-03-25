// main tools
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'

// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// components
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { Evaluation } from 'components/molecules/Evaluation'
import { Layout } from 'components/organisms/Layout'
import { Notes } from 'components/molecules/Notes'

// gql
import GET_SESSION_TOKEN from 'lib/queries/Session/GetCoachSessionTokens.gql'
import { useQuery } from '@apollo/client'

// utils
import { microServices } from 'commons'

// styles
import classes from 'styles/UI/Card/AppCard.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import { VideoCallProps } from 'types/components/Agora'
import { GetSSPropsType } from 'types'

const CoachSession: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachingSessionId,
}) => {
  const { data: session } = useSession()
  const [videoSession, setVideoSession] = useState<VideoCallProps>({
    channel: '',
    token: '',
    uid: 0,
  })
  const AgoraVideoCall = dynamic<any>(
    () =>
      import('components/molecules/AgoraVideoCall').then(
        (comp) => comp.AgoraVideoCall
      ),
    { ssr: false }
  )

  useQuery(GET_SESSION_TOKEN, {
    variables: { id: parseFloat(`${coachingSessionId}.0`) },
    context: { ms: microServices.backend },
    onCompleted: (data) =>
      setVideoSession({
        channel: data.getCoachSessionTokens.videoSessionChannel,
        token: data.getCoachSessionTokens.tokens.rtcToken,
        uid: session?.user.id as number,
      }),
  })

  return (
    <Layout>
      <Container>
        <Row className='mt-4'>
          <Col md={6} lg={3} className='mt-4'>
            <Container className={`p-4 ${classes.section}`}>
              {/* <CoacheeProfileCard showButton={true} /> */}
            </Container>
          </Col>
          <Col md={6} className='mt-4'>
            {videoSession.channel !== '' &&
              videoSession.token !== '' &&
              videoSession.uid !== 0 && <AgoraVideoCall {...videoSession} />}
          </Col>
          <Col md={12} lg={3} className='mt-4'>
            <Container className={`p-4 ${classes.section}`}>
              {/* <Notes /> */}
            </Container>
          </Col>
        </Row>
        <Row className='mt-4 mb-4'>
          <Col>
            <Container className={`p-5 ${classes.section}`}>
              {/* <Evaluation /> */}
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return { props: { coachingSessionId: ctx.params?.id } }
}
export default CoachSession
