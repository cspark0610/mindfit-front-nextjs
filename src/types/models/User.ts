import { OrganizationDataType } from 'types/models/Organization'
import { CoachDataType } from 'types/models/Coach'
import { CoacheeDataType } from 'types/models/Coachee'

export type UserDataType = {
  id?: number
  sub?: number
  role?: 'COACHEE' | 'COACH' | 'SUPER_USER'
  name?: string
  email?: string
  coach?: CoachDataType
  coachee?: CoacheeDataType
  isStaff?: boolean
  createdAt?: string
  password?: string
  lastName?: string
  languages?: string
  isActive?: boolean
  firstName?: string
  isVerified?: boolean
  isSuperUser?: boolean
  organization?: OrganizationDataType
}
