// main tools
import { useEffect, useState } from 'react'
import AgoraUIKit from 'agora-react-uikit'

// styles
import { UIKitStyles } from 'styles/VideoCall/agoraUI'
import Styles from 'styles/VideoCall/VideoCall.module.scss'

// types
import { FC } from 'react'
import { VideoCallProps } from 'types/components/Agora'

export const AgoraVideoCall: FC<VideoCallProps> = ({ channel, token, uid }) => {
  const [videocall, setVideocall] = useState(false)

  const props = {
    rtcProps: {
      uid,
      token,
      channel,
      appId: process.env.NEXT_PUBLIC_AGORA_ID as string,
    },
    callbacks: { EndCall: () => setVideocall(false) },
  }

  useEffect(() => setVideocall(true), [])

  return (
    <div className={Styles.container}>
      {videocall ? <AgoraUIKit {...props} styleProps={UIKitStyles} /> : null}
    </div>
  )
}
