// types
import { ColaboratorDataType } from 'types/models/Colaborator'

export const validateUserSignup = (colaboratorData: ColaboratorDataType) => {
  if (
    !colaboratorData.picture.type ||
    !colaboratorData.firstName ||
    !colaboratorData.lastName ||
    !colaboratorData.email ||
    !colaboratorData.position
  )
    return false

  return true
}

export const workPositions = ['Developer']
