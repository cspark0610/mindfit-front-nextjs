// types
import { CoacheeDataType } from 'types/models/Coachee'
import { UserDataType } from 'types/models/User'

export const validateUserSignup = (
  colaboratorData: UserDataType & CoacheeDataType
) => {
  if (
    !colaboratorData.profilePicture?.type ||
    !colaboratorData.name ||
    !colaboratorData.bio ||
    !colaboratorData.aboutPosition ||
    !colaboratorData.position
  )
    return false

  return true
}

export const workPositions = ['Owner', 'Developer', 'Supervisor']
