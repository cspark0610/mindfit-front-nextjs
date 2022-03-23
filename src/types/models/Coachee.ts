import { UserDataType } from './User'
import { CoachDataType } from './Coach'
import { fileDataType } from './Files'
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
  dimensionAverages?: { base: number; average: number; dimension: string }[]
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
  profilePicture?: fileDataType
  coachNotes?: {
    id: number
    note: string
  }[]
  canViewDashboard?: boolean
  invitationAccepted?: boolean
  registrationStatus?: keyof typeof coacheeRegistrationStatus
}
