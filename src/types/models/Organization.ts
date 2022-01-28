import { UserDataType } from './User'

export type OrganizationDataType = {
  profilePicture?: File
  id?: number
  name?: string
  about?: string
  isActive?: boolean
  owner?: UserDataType
}
