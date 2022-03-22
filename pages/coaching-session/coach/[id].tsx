// bootstrap components
import { Col, Container, Row } from 'react-bootstrap'

// components
import { Layout } from 'components/organisms/Layout'
import { CoacheeProfileCard } from 'components/molecules/CoacheeProfileCard'
import { Notes } from 'components/molecules/Notes'

import { Evaluation } from 'components/molecules/Evaluation'

// styles
import classes from 'styles/UI/Card/AppCard.module.scss'

// types
import { GetServerSidePropsContext, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import GET_SESSION_TOKEN from 'lib/queries/Session/GetCoachSessionTokens.gql'
import { useQuery } from '@apollo/client'
import { microServices } from 'commons'
import { GetSSPropsType } from 'types'
import { VideoCallProps } from 'types/components/Agora'

const CoachSession: NextPage<GetSSPropsType<typeof getServerSideProps>> = ({
  coachingSessionId,
}) => {
  const [videoSession, setVideoSession] = useState<VideoCallProps>({
    channel: '',
    token: '',
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
    onCompleted: (data) => {
      console.log(data)
      if (data.getCoachSessionTokens.videoSessionChannel) {
        setVideoSession({
          channel: data.getCoachSessionTokens.videoSessionChannel,
          token: data.getCoachSessionTokens.tokens.rtcToken,
        })
      }
    },
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
            {videoSession.channel !== '' && videoSession.token !== '' && (
              <AgoraVideoCall
                channel={videoSession.channel}
                token={videoSession.token}
              />
            )}
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
