import { AgendaDataType } from './Agenda'
import { UserDataType } from './User'
import { fileDataType } from './Files'

export type CoachDataType = {
  id?: number
  bio?: string
  user?: UserDataType
  isActive?: boolean
  phoneNumber?: string
  coachAgenda?: AgendaDataType
  profileVideo?: fileDataType | File
  profilePicture?: fileDataType | File
  coachingAreas?: {
    id?: number
    name?: string
    codename?: string
    description?: string
    coverPicture?: string
  }[]
}
