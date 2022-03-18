// main tools
import { useState, useRef } from 'react'
import Image from 'next/image'

// bootstrap components
import { CloseButton } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'

// prime components
import { FileUpload } from 'primereact/fileupload'

// styles
import classes from 'styles/UI/Input/AppInput.module.scss'

// types
import { FC } from 'react'
import { FileUploadSelectParams } from 'primereact/fileupload'
import {
  UploadPicturesProps,
  UploadPicturesRef,
} from 'types/components/UploadPicture'

export const UploadPicture: FC<UploadPicturesProps> = ({
  data = '',
  setData,
}) => {
  const [picture, setPicture] = useState(data)
  const uploader = useRef<UploadPicturesRef>(null)

  const handleClick = () => uploader.current?.choose()
  const handleDelete = () => {
    uploader.current?.clear()
    setPicture('')
    setData((prev: any) => ({ ...prev, profilePicture: {} }))
  }

  const handleSelect = async (ev: FileUploadSelectParams) => {
    const picture = new File([ev.files[0]], ev.files[0].name, {
      type: ev.files[0].type,
    })

    const arrayBuffer = await picture.arrayBuffer()
    const buf = Buffer.alloc(arrayBuffer.byteLength)
    const view = new Uint8Array(arrayBuffer)
    for (let i = 0; i < buf.length; i++) {
      buf[i] = view[i]
    }

    setData((prev: any) => ({ ...prev, profilePicture: buf }))
    setPicture(URL.createObjectURL(picture))
  }

  return (
    <div className={classes.upload}>
      <FileUpload
        customUpload
        mode='basic'
        accept='image/*'
        maxFileSize={1000000}
        onSelect={handleSelect}
        ref={uploader}
        className={classes.upload_hidden}
      />
      <div className={classes.upload_container}>
        {!picture ? (
          <div onClick={handleClick} className={classes.upload_input}>
            <Plus size={30} />
          </div>
        ) : (
          <div className={classes.upload_preview}>
            <Image
              src={picture}
              alt='profile'
              width={120}
              height={120}
              className={classes.upload_preview_img}
            />
            <CloseButton
              onClick={handleDelete}
              className={classes.upload_preview_close}
            />
          </div>
        )}
      </div>
    </div>
  )
}
