// commons
import { microServices } from 'commons'

// types
import { CoachDataType } from 'types/models/Coach'
import { UserDataType } from 'types/models/User'

export const initialStateCoach = (coachData: CoachDataType) => {
  const INITIAL_STATE = {
    bio: coachData.bio,
    videoPresentation: coachData.videoPresentation,
    profilePicture: coachData.profilePicture,
  }
  return INITIAL_STATE
}

export const initialStateUser  = (userData:UserDataType | undefined) => {
  const INITIAL_STATE = {
    name: userData?.name,
    email: userData?.email
  }
  return INITIAL_STATE
}

export const validateCoachProfile = (coachData: CoachDataType, userData: UserDataType) => {
  if (
    !coachData.bio ||
    !coachData.profilePicture ||
    !coachData.videoPresentation ||
    !userData.name ||
    !userData.email
  )
    return false
  return true
}

export const saveData = async (
  session: any,
  coachData: CoachDataType,
  userData: UserDataType,
  newUserData: Function,
  newCoachData: Function
) => {
  try {
    await newUserData({
      variables: {
        id: session.sub,
        data: userData,
      },
      context: { ms: microServices.backend },
    })
    await newCoachData({
      variables: {
        id: session.coach.id,
        data: coachData,
      },
      context: { ms: microServices.backend },
    })
    return { succes: true }
  } catch {
    return { succes: false }
  }
}
