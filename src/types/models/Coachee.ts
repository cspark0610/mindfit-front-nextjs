export type CoacheeDataType = {
  id?: number
  bio?: string
  isAdmin?: boolean
  invited?: boolean
  isActive?: boolean
  phoneNumber?: string
  aboutPosition?: string
  position?: string | null
  canViewDashboard?: boolean
  invitationAccepted?: boolean
  profilePicture?: string | File
}
