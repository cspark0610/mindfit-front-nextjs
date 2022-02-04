// main tools
import Image from 'next/image'

// bootstrap components
import { Toast, ToastContainer } from 'react-bootstrap'

// types
import { FC } from 'react'
import { ToastProps } from 'react-bootstrap'
import { ToastContainerProps } from 'react-bootstrap'

interface Props extends ToastProps, ToastContainerProps {
  title?: string
  message?: string
  subtitle?: string
}

export const INITIAL_TOAST_STATE = {
  show: false,
  message: '',
}

export const Toasts: FC<Props> = ({ title, subtitle, message, show, ...props }) => {
  return (
    <ToastContainer {...props}>
      <Toast show={show} {...props}>
        <Toast.Header>
          <Image
            src='/assets/icon/MINDFIT-ICON.svg'
            alt='logo'
            width={40}
            height={40}
            className={title ?? 'me-auto'}
          />
          {title && <strong className='me-auto'>{title}</strong>}
          {subtitle && <small>{subtitle}</small>}
        </Toast.Header>
        {message && <Toast.Body>{message}</Toast.Body>}
      </Toast>
    </ToastContainer>
  )
}
