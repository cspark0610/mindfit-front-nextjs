// main tools
import { useState, useRef } from 'react'
import Image from 'next/image'
import dayjs from 'dayjs'

// bootstrap components
import { CloseButton } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'

// prime components
import { FileUpload } from 'primereact/fileupload'

// gql
import { useLazyQuery } from '@apollo/client'
import GET_UPLOAD_FILES_URL from 'lib/queries/getUploadFilesUrl.gql'

// utils
import { microServices } from 'commons'

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
  setUploadUrl,
}) => {
  const [picture, setPicture] = useState(data)
  const uploader = useRef<UploadPicturesRef>(null)

  const [getUploadFilesUrl] = useLazyQuery(GET_UPLOAD_FILES_URL, {
    context: { ms: microServices.backend },
    onCompleted: (url) => setUploadUrl(url.getUploadSignedUrl),
  })

  const handleClick = () => uploader.current?.choose()
  const handleDelete = () => {
    uploader.current?.clear()
    setPicture('')
    setData((prev: any) => ({ ...prev, profilePicture: null }))
  }

  const handleSelect = async (ev: FileUploadSelectParams) => {
    const picture = new File(
      [ev.files[0]],
      dayjs().toISOString().concat(`-${ev.files[0].name}`),
      { type: ev.files[0].type }
    )

    setData((prev: any) => ({ ...prev, profilePicture: picture }))
    setPicture(URL.createObjectURL(picture))

    await getUploadFilesUrl({
      variables: { data: { key: picture.name, type: picture.type } },
    })
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
