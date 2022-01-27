// bootstrap icons
import { CheckSquare, XCircleFill } from 'react-bootstrap-icons'

// styles
import classes from 'styles/AlertText/alertText.module.scss'

// types
import { FC } from 'react'

interface AlertTextProps {
  alertType: string
  text: string
}

export const AlertText: FC<AlertTextProps> = ({ alertType, text }) => (
  <>
    <span
      className={
        alertType === 'success' ? classes.successText : classes.errorText
      }>
      {alertType === 'success' ? (
        <CheckSquare width={24} height={24} />
      ) : (
        <XCircleFill width={24} height={24} />
      )}
      {text}
    </span>
  </>
)
