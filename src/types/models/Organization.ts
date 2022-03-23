import { UserDataType } from './User'
import { fileDataType } from './Files'

export type OrganizationDataType = {
  id?: number
  name?: string
  about?: string
  isActive?: boolean
  owner?: UserDataType
  profilePicture?: fileDataType
}
