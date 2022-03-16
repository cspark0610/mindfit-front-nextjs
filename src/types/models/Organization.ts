import { UserDataType } from './User'

export type OrganizationDataType = {
  id?: number
  name?: string
  about?: string
  isActive?: boolean
  owner?: UserDataType
  profilePicture?: {
    key: string
    filename: string
    location: string
  }
}
