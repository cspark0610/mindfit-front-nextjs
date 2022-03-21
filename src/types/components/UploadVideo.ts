// types
import { FileUpload } from 'primereact/fileupload'
import { CoachDataType } from 'types/models/Coach'
import { SetStateType } from 'types'

export type UploadVideoProps = {
  data?: string
  setData: SetStateType<CoachDataType>
}

export interface UploadVideoRef extends FileUpload {
  choose: () => void
  clear: () => void
  state: {
    files: File[]
    msgs: string[]
    focused: boolean
    progress: number
  }
}
