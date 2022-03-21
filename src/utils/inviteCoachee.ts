import { CoacheeDataType } from 'types/models/Coachee'

export const INITIAL_STATE = {
  position: '',
  isAdmin: false,
  canViewDashboard: false,
  user: {
    name: '',
    email: '',
  },
}

export const validateCoachee = (coacheeData: CoacheeDataType) => {
  if (
    !coacheeData.user?.name ||
    !coacheeData.user?.email ||
    !coacheeData.position
  )
    return false
  return true
}
