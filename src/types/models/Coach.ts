import { AgendaDataType } from './Agenda'
import { UserDataType } from './User'

export type CoachDataType = {
  id?: number
  bio?: string
  isActive?: boolean
  user?: UserDataType
  phoneNumber?: string
  profilePicture?: File
  videoPresentation?: string
  coachAgenda?: AgendaDataType
  coachingAreas?: {
    id?: number
    name?: string
    codename?: string
    description?: string
    coverPicture?: string
  }[]
}
