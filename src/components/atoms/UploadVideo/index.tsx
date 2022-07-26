// main tools
import { useState, useRef } from 'react'
import dayjs from 'dayjs'

// gql
import { useLazyQuery } from '@apollo/client'
import GET_UPLOAD_FILES_URL from 'lib/queries/getUploadFilesUrl.gql'

// utils
import { microServices } from 'commons'

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
import { UploadVideoProps, UploadVideoRef } from 'types/components/UploadVideo'

export const UploadVideo: FC<UploadVideoProps> = ({
  data = '',
  setData,
  setUploadUrl,
}) => {
  const uploader = useRef<UploadVideoRef>(null)
  const [video, setVideo] = useState(data)

  const [getUploadFilesUrl] = useLazyQuery(GET_UPLOAD_FILES_URL, {
    context: { ms: microServices.backend },
    onCompleted: (url) => setUploadUrl(url.getUploadSignedUrl),
  })

  const handleClick = () => uploader.current?.choose()
  const handleDelete = () => {
    uploader.current?.clear()
    setVideo('')
    setData((prev: any) => ({ ...prev, profileVideo: null }))
  }

  const handleSelect = async (ev: FileUploadSelectParams) => {
    const video = new File(
      [ev.files[0]],
      dayjs().toISOString().concat(`-${ev.files[0].name}`),
      { type: ev.files[0].type }
    )

    setData((prev: any) => ({ ...prev, profileVideo: video }))
    setVideo(URL.createObjectURL(video))

    await getUploadFilesUrl({
      variables: { data: { key: video.name, type: video.type } },
    })
  }

  return (
    <div className={classes.upload}>
      <FileUpload
        mode='basic'
        customUpload
        ref={uploader}
        maxFileSize={1000000}
        onSelect={handleSelect}
        className={classes.upload_hidden}
        accept='video/mp4,video/x-m4v,video/*'
      />
      <div className={classes.upload_container}>
        {!video ? (
          <div onClick={handleClick} className={classes.upload_input}>
            <Plus size={30} />
          </div>
        ) : (
          <div className={classes.upload_preview}>
            <video
              controls
              src={video}
              controlsList='nodownload'
              className={classes.upload_preview_video}
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
