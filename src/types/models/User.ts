import { CompanyDataType } from 'types/models/Company'

export type UserDataType = {
  id?: number
  sub?: number
  name?: string
  email?: string
  isStaff?: boolean
  password?: string
  lastName?: string
  languages?: string
  isActive?: boolean
  firstName?: string
  isVerified?: boolean
  isSuperUser?: boolean
  organization?: CompanyDataType
  picture?: File
}
