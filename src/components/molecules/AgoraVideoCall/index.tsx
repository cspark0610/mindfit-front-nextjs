// main tools
import { useEffect, useState } from 'react'
import AgoraUIKit from 'agora-react-uikit'

// styles
import { UIKitStyles } from 'styles/VideoCall/agoraUI'
import Styles from 'styles/VideoCall/VideoCall.module.scss'

// types
import { FC } from 'react'
import { VideoCallProps } from 'types/components/Agora'

export const AgoraVideoCall: FC<VideoCallProps> = ({ channel, token }) => {
  const [videocall, setVideocall] = useState(false)
  useEffect(() => {
    if (!!channel && !!token && channel !== '' && token !== '') {
      setVideocall(true)
    }
  }, [])

  const props = {
    rtcProps: {
      appId: '3d2452ae22b54bd7b037d89b006c2cb8',
      channel: channel,
      token: token,
    },
    callbacks: { EndCall: () => setVideocall(false) },
  }

  return (
    <div className={Styles.container}>
      {videocall ? <AgoraUIKit {...props} styleProps={UIKitStyles} /> : null}
    </div>
  )
}
