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
import GET_CONTENT from 'lib/strapi/queries/Coachee/detailContent.gql'
import { initializeApolloClient } from 'lib/apollo'
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
  content,
}) => {
  const { data: session } = useSession()
  const [coachee, setCoachee] = useState({})
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
    onCompleted: (data) => {
      setCoachee(data.getCoachSessionTokens.coachingSession.coachee)
      setVideoSession({
        channel: data.getCoachSessionTokens.videoSessionChannel,
        token: data.getCoachSessionTokens.tokens.rtcToken,
        uid: session?.user.sub as number,
      })
    },
  })

  return (
    <Layout>
      <Container>
        <Row className='mt-4'>
          {coachee && <CoacheeProfileCard coachee={coachee} />}
          <Col md={6} lg={8} xl={6} className='mt-4'>
            {videoSession.channel !== '' &&
              videoSession.token !== '' &&
              videoSession.uid !== 0 && <AgoraVideoCall {...videoSession} />}
          </Col>
          <Col md={12} xl={3} className='mt-4'>
            <Container className={`p-4 ${classes.section}`}>
              <Notes coachee={coachee} content={content} />
            </Container>
          </Col>
        </Row>
        <Row className='mt-4 mb-4'>
          <Col>
            <Container className={`p-5 ${classes.section}`}>
              <Evaluation coachee={coachee} content={content} />
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const apolloClient = initializeApolloClient()
  const { data: content } = await apolloClient.query({
    query: GET_CONTENT,
    variables: { locale: ctx.locale },
    context: { ms: microServices.strapi },
  })

  return {
    props: {
      coachingSessionId: ctx.params?.id,
      content: content.coacheeDetail.data.attributes,
    },
  }
}
export default CoachSession
