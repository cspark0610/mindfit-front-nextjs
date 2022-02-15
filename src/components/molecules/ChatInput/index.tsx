// main tools
import { useRef, useState } from 'react'

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
import { ChangeType } from 'types'
import { IEmojiData } from 'emoji-picker-react'
import { InputTextRef } from 'types/components/InputText'
import { UploadPicturesRef } from 'types/components/UploadPicture'

export const InputChat: FC = () => {
  const [message, setMessageForm] = useState<string>('')
  const [picture, setPicture] = useState('')

  const inputText = useRef<InputTextRef>(null)
  const uploader = useRef<UploadPicturesRef>(null)

  const inputChange = (ev: ChangeType) => {
    setMessageForm(ev.target.value)
  }

  const onEmojiClick = (ev: React.MouseEvent, emojiObject: IEmojiData) => {
    const cursor = inputText.current?.selectionStart
    const text =
      message.slice(0, cursor) + emojiObject.emoji + message.slice(cursor)
    setMessageForm(text)
  }
  const fileUpload = () => {
    uploader.current?.choose()
  }
  const fileSelect = (ev: FileUploadSelectParams) => {
    setPicture(URL.createObjectURL(ev.files[0]))
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
        <div className={`${classes.content} p-inputgroup`}>
          <InputText
            ref={inputText}
            value={message}
            onChange={inputChange}
            className={classes.inputChat}
          />
          <OverlayTrigger
            trigger='click'
            placement='top-end'
            rootCloseEvent='mousedown'
            rootClose={true}
            overlay={popover}>
            <Button className={classes.button_input} size='lg'>
              <EmojiLaughing />
            </Button>
          </OverlayTrigger>
          <FileUpload
            customUpload
            mode='basic'
            accept='image/*'
            maxFileSize={1000000}
            onSelect={fileSelect}
            ref={uploader}
            className={classes.upload_hidden}
          />
          <Button
            className={classes.button_input}
            onClick={fileUpload}
            size='lg'>
            <ImageIcon />
          </Button>
        </div>
      </Container>
    </Row>
  )
}
