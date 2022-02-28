import { FileUpload } from 'primereact/fileupload'
import { SetStateType } from 'types'
import { UserDataType } from 'types/models/User'
import { OrganizationDataType } from 'types/models/Organization'
import { CoacheeDataType } from 'types/models/Coachee'
import { CoachDataType } from 'types/models/Coach'

export type UploadPicturesProps = {
  setData:
    | SetStateType<UserDataType>
    | SetStateType<OrganizationDataType>
    | SetStateType<CoacheeDataType>
    | SetStateType<CoachDataType>
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
