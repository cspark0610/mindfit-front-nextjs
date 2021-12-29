import { FileUpload } from 'primereact/fileupload'
import { SetStateType } from 'types'

export type UploadPicturesProps = {
  setUserData: SetStateType<{
    profilePicture: File
    firstName: string
    lastName: string
    email: string
    password: string
  }>
}

export interface UploadPicturesRef extends FileUpload {
  choose: () => void
  clear: () => void
  state: {
    files: File[]
    focused: boolean
    msgs: string[]
    progress: number
  }
}
