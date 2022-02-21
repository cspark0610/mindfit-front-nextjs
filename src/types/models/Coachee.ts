import { CoachDataType } from './Coach'
import { UserDataType } from './User'

export type CoacheeDataType = {
  id?: number
  bio?: string
  isAdmin?: boolean
  invited?: boolean
  user?: UserDataType
  isActive?: boolean
  phoneNumber?: string
  aboutPosition?: string
  position?: string | null
  canViewDashboard?: boolean
  organization?: { id?: number }
  assignedCoach?: CoachDataType
  invitationAccepted?: boolean
  profilePicture?: string | File
  coachingAreas?: { id?: number; name?: string }
  registrationStatus?:
    | 'INVITATION_PENDING'
    | 'SAT_PENDING'
    | 'COACH_SELECTION_PENDING'
    | 'COACH_APPOINTMENT_PENDING'
    | 'REGISTRATION_COMPLETED'
}
