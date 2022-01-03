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

export const UploadPicture: FC<UploadPicturesProps> = ({ setData }) => {
  const [picture, setPicture] = useState('')
  const uploader = useRef<UploadPicturesRef>(null)

  const handleClick = () => uploader.current?.choose()
  const handleDelete = () => {
    uploader.current?.clear()
    setPicture('')
    setData((prev: any) => ({ ...prev, picture: {} }))
  }

  const handleSelect = (ev: FileUploadSelectParams) => {
    const picture = ev.files[0]
    setData((prev: any) => ({ ...prev, picture: picture }))
    setPicture(URL.createObjectURL(ev.files[0]))
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
