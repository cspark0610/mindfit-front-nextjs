// main tools
import dynamic from 'next/dynamic'

// bootstrap components
import { Row } from 'react-bootstrap'

// Emojis
import { IEmojiPickerProps } from 'emoji-picker-react'

// types
import { ComponentType, FC } from 'react'

export const EmojisPicker: FC<IEmojiPickerProps> = ({ onEmojiClick }) => {
  const Picker: ComponentType<IEmojiPickerProps> = dynamic(
    () => import('emoji-picker-react')
  )

  return (
    <Row>
      {process.browser && (
        <Picker
          onEmojiClick={onEmojiClick}
          disableAutoFocus
          disableSkinTonePicker
          native
          pickerStyle={{ border: 'none' }}
        />
      )}
    </Row>
  )
}
