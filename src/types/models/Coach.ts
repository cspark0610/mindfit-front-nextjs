import { AgendaDataType } from './Agenda'
import { UserDataType } from './User'

export type CoachDataType = {
  id?: number
  bio?: string
  user?: UserDataType
  isActive?: boolean
  phoneNumber?: string
  coachAgenda?: AgendaDataType
  profileVideo?: {
    key: string
    filename: string
    location: string
  }
  profilePicture?: {
    key: string
    filename: string
    location: string
  }
  coachingAreas?: {
    id?: number
    name?: string
    codename?: string
    description?: string
    coverPicture?: string
  }[]
}
