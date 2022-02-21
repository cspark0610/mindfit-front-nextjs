// main tools
import { useRef, useState } from 'react'
import { useSession } from 'next-auth/react'

// bootstrap components
import {
  Button,
  Container,
  OverlayTrigger,
  Popover,
  Row,
} from 'react-bootstrap'
import { EmojiLaughing, Image as ImageIcon } from 'react-bootstrap-icons'

// prime components
import { InputText } from 'primereact/inputtext'
import { FileUpload, FileUploadSelectParams } from 'primereact/fileupload'

// components
import { EmojisPicker } from 'components/atoms/EmojisPicker'

// styles
import classes from 'styles/Chat/inputChat.module.scss'

// types
import { FC } from 'react'
import { ChangeType, SetStateType, SubmitType } from 'types'
import { IEmojiData } from 'emoji-picker-react'
import { InputTextRef } from 'types/components/InputText'
import { UploadPicturesRef } from 'types/components/UploadPicture'

export const InputChat: FC<{ updateChat: SetStateType<any[]> }> = ({
  updateChat,
}) => {
  const { data } = useSession()
  const [message, setMessage] = useState('')
  const [picture, setPicture] = useState('')

  const inputText = useRef<InputTextRef>(null)
  const uploader = useRef<UploadPicturesRef>(null)

  const inputChange = (ev: ChangeType) => setMessage(ev.target.value)

  const onEmojiClick = (_: React.MouseEvent, emojiObject: IEmojiData) => {
    const cursor = inputText.current?.selectionStart
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor)
    setMessage(text)
  }

  const fileUpload = () => uploader.current?.choose()

  const fileSelect = (ev: FileUploadSelectParams) =>
    setPicture(URL.createObjectURL(ev.files[0]))

  const handleSubmit = (ev: SubmitType) => {
    ev.preventDefault()

    updateChat((prev) =>
      prev.concat({
        user: {
          name: data?.user.name as string,
          profilePicture: '/assets/images/userAvatar.svg',
        },
        receivedDate: '1 min',
        message: message,
        status: 'sent',
      })
    )
    setMessage('')
  }

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body>
        <EmojisPicker onEmojiClick={onEmojiClick} />
      </Popover.Body>
    </Popover>
  )

  return (
    <Row>
      <Container>
        <form
          onSubmit={handleSubmit}
          className={`${classes.content} p-inputgroup`}>
          <InputText
            ref={inputText}
            value={message}
            onChange={inputChange}
            className={classes.inputChat}
          />
          <OverlayTrigger
            trigger='click'
            rootClose={true}
            overlay={popover}
            placement='top-end'
            rootCloseEvent='mousedown'>
            <Button className={classes.button_input} size='lg'>
              <EmojiLaughing />
            </Button>
          </OverlayTrigger>
          <FileUpload
            customUpload
            mode='basic'
            ref={uploader}
            accept='image/*'
            onSelect={fileSelect}
            maxFileSize={1000000}
            className={classes.upload_hidden}
          />
          <Button
            size='lg'
            onClick={fileUpload}
            className={classes.button_input}>
            <ImageIcon />
          </Button>
        </form>
      </Container>
    </Row>
  )
}
