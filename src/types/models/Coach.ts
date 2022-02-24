import { UserDataType } from './User'

export type CoachDataType = {
  id?: number
  bio?: string
  isActive?: boolean
  user?: UserDataType
  phoneNumber?: string
  profilePicture?: File
  videoPresentation?: string
  coachingAreas?: { id?: number; name?: string }[]
}
