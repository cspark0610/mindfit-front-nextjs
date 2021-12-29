import { FileUpload } from 'primereact/fileupload'
import { SetStateType } from 'types'
import { UserDataType } from 'types/models/User'
import { CompanyDataType } from 'types/models/Company'

export type UploadPicturesProps = {
  setData: SetStateType<UserDataType> | SetStateType<CompanyDataType>
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
