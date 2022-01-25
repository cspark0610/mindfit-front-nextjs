import { FileUpload } from 'primereact/fileupload'
import { SetStateType } from 'types'
import { UserDataType } from 'types/models/User'
import { OrganizationDataType } from 'types/models/Organization'
import { ColaboratorDataType } from 'types/models/Colaborator'

export type UploadPicturesProps = {
  setData:
    | SetStateType<UserDataType>
    | SetStateType<OrganizationDataType>
    | SetStateType<ColaboratorDataType>
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
