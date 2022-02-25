// main tools
import { useState } from 'react'
import AgoraUIKit from 'agora-react-uikit'

// styles
import { UIKitStyles } from 'styles/VideoCall/agoraUI'
import Styles from 'styles/VideoCall/VideoCall.module.scss'

// types
import { FC } from 'react'

export const AgoraVideoCall: FC = () => {
  const [videocall, setVideocall] = useState(true)
  const props = {
    rtcProps: {
      appId: '3d2452ae22b54bd7b037d89b006c2cb8',
      channel: 'mindfit',
      token:
        '0063d2452ae22b54bd7b037d89b006c2cb8IAAnmnxI4/w/+GAtSPB4p2G0QV0iwsDS9gIBDt0PyykNMujXvWUAAAAAEAAn2yw6fEIZYgEAAQB2Qhli',
    },
    callbacks: { EndCall: () => setVideocall(false) },
  }

  return (
    <div className={Styles.container}>
      {videocall ? <AgoraUIKit {...props} styleProps={UIKitStyles} /> : null}
    </div>
  )
}
