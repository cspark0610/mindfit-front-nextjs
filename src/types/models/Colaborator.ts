// utils
import { INITIAL_STATE } from 'utils/addColaborator'

export type ColaboratorDataType = {
  picture?: File
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  position?: string
}

export type InvitedColaboratorType = typeof INITIAL_STATE
