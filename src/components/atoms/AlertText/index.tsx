import { FC } from 'react'
import { CheckSquare, XCircleFill } from 'react-bootstrap-icons'
import classes from 'styles/AlertText/alertText.module.scss'

interface AlertTextProps {
  alertType: string
  text: string
}

export const AlertText: FC<AlertTextProps> = ({ alertType, text }) => {
  return (
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
}
