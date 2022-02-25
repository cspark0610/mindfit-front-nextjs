import { StylePropInterface } from 'agora-react-uikit'

export const UIKitStyles: StylePropInterface = {
  videoMode: { max: 'cover' },
  UIKitContainer: {
    position: 'relative',
    background: '#838383',
    overflow: 'hidden',
    borderRadius: '24px',
  },
  minViewContainer: {
    maxWidth: 'auto',
    maxHeight: '168px',
    position: 'absolute',
    top: '0px',
    right: '0px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  minViewStyles: {
    maxWidth: '128px',
    maxHeight: '128px',
    margin: '32px 40px 0 0',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '1px 1px 15px 3px rgba(184, 88, 32, 0.2)',
  },
  minViewOverlayContainer: {
    background: 'red',
  },

  maxViewContainer: {
    position: 'absolute',
    width: '100%',
    height: '500px',
  },
  maxViewStyles: {},
  localBtnContainer: {
    background: 'transparent',
    position: 'absolute',
    bottom: '20px',
    left: '0px',
  },
  localBtnStyles: {
    endCall: {
      minHeight: '48px',
      minWidth: '48px',
      background: 'rgb(220,60,60)',
      border: 'none',
    },
    muteLocalAudio: {
      minHeight: '48px',
      minWidth: '48px',
      background: 'transparent',
      border: 'none',
    },
    muteLocalVideo: {
      minHeight: '48px',
      minWidth: '48px',
      background: 'transparent',
      border: 'none',
    },
  },
}
