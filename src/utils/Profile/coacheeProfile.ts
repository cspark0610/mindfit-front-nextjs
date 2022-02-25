// Types
import { CoacheeDataType } from 'types/models/Coachee'

export const validateCoacheeProfile = (coacheeData: CoacheeDataType) => {
  if (
    !coacheeData.user?.name ||
    !coacheeData.user?.email ||
    !coacheeData.position ||
    !coacheeData.profilePicture
  )
    return false
  return true
}
