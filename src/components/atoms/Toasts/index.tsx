// bootstrap components
import { Toast, ToastContainer } from 'react-bootstrap'

// types
import { FC, useState } from 'react'

interface Props {
  title: string
  message: string
  visible: boolean
  background: string
}

export const Toasts: FC<Props> = ({ title, message, visible, background }) => {
  const [show, setShow] = useState(visible)
  return (
    <ToastContainer position='bottom-center'>
      <Toast
        className='d-inline-block m-1'
        show={show}
        onClose={() => setShow(false)}
        bg={background}
        autohide>
        <Toast.Header>
          <strong className='me-auto'>{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
