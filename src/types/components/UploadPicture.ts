// types
import { OrganizationDataType } from 'types/models/Organization'
import { CoacheeDataType } from 'types/models/Coachee'
import { FileUpload } from 'primereact/fileupload'
import { CoachDataType } from 'types/models/Coach'
import { SetStateType } from 'types'

export type UploadPicturesProps = {
  data?: string
  setUploadUrl: SetStateType<string>
  setData:
    | SetStateType<OrganizationDataType>
    | SetStateType<CoacheeDataType>
    | SetStateType<CoachDataType>
}

export interface UploadPicturesRef extends FileUpload {
  choose: () => void
  clear: () => void
  state: {
    files: File[]
    msgs: string[]
    focused: boolean
    progress: number
  }
}
