import { UserDataType } from './User'

export type CompanyDataType = {
  profilePicture?: File
  id?: number
  name?: string
  about?: string
  isActive?: boolean
  owner?: UserDataType
}
