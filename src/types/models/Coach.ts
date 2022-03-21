import { AgendaDataType } from './Agenda'
import { UserDataType } from './User'

export type fileDataType = {
  key: string
  filename: string
  location: string
}

export type CoachDataType = {
  id?: number
  bio?: string
  user?: UserDataType
  isActive?: boolean
  phoneNumber?: string
  coachAgenda?: AgendaDataType
  profileVideo?: fileDataType
  profilePicture?: fileDataType
  coachingAreas?: {
    id?: number
    name?: string
    codename?: string
    description?: string
    coverPicture?: string
  }[]
}
