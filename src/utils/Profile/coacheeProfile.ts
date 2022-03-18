// Types
import { CoacheeDataType } from 'types/models/Coachee'

export const validateCoacheeProfile = (coacheeData: CoacheeDataType) => {
  if (
    !coacheeData.user?.name ||
    !coacheeData.user?.email ||
    !coacheeData.position
  )
    return false
  return true
}
