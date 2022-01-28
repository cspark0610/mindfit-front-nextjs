import { OrganizationDataType } from 'types/models/Organization'
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'

export type UserDataType = {
  id?: number
  sub?: number
  name?: string
  email?: string
  coach?: CoachDataType
  coachee?: CoacheeDataType
  isStaff?: boolean
  password?: string
  lastName?: string
  languages?: string
  isActive?: boolean
  firstName?: string
  isVerified?: boolean
  isSuperUser?: boolean
  organization?: OrganizationDataType
  profilePicture?: File
}
