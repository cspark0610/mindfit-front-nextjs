import { UserDataType } from './User'
import { CoachDataType } from './Coach'
import { OrganizationDataType } from './Organization'
import { coacheeRegistrationStatus } from 'utils/enums'

export type CoacheeDataType = {
  id?: number
  bio?: string
  user?: UserDataType
  isAdmin?: boolean
  invited?: boolean
  isActive?: boolean
  position?: string | null
  phoneNumber?: string
  organization?: OrganizationDataType
  assignedCoach?: CoachDataType
  aboutPosition?: string
  coachAppointments?: {
    id: number
    accomplished: boolean
    coachConfirmation: boolean
    coacheeConfirmation: boolean
    startDate: string
    endDate: string
    remarks: string
  }[]
  coachingAreas?: {
    id?: number
    name?: string
    value?: number
    base?: number
  }[]
  profilePicture?: string | File
  canViewDashboard?: boolean
  invitationAccepted?: boolean
  registrationStatus?: keyof typeof coacheeRegistrationStatus
}
