// Commons
import { microServices } from 'commons'

// Types
import { UserDataType } from 'types/models/User'

export const initialState = (userSession:any) => {
  const name = userSession.name.split(' ')
  const INITIAL_STATE = {
    firstName: name[0],
    lastName: name[1],
    email: userSession?.email,
    password: userSession?.password,
    coachee: {
      profilePicture: userSession?.coachee?.profilePicture as File,
      position: userSession?.coachee?.position,
    },
  }
  return INITIAL_STATE
}

export const validateUserProfile = (profileData: UserDataType) => {
  if (
    !profileData.firstName ||
    !profileData.lastName ||
    !profileData.email ||
    !profileData.coachee?.position ||
    !profileData.coachee?.profilePicture
  )
    return false
  return true
}

export const saveData = async (
  userSession: UserDataType,
  userData: UserDataType,
  newData: Function
) => {
  try {
    await newData({
      variables: {
        user_data: {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
        },
        user_id: userSession.id,
        coachee_data: userData.coachee,
        coachee_id: userSession.coachee?.id,
      },
      context: { ms: microServices.backend },
    })
    return { succes: true }
  } catch {
    return { succes: false }
  }
}

export const savePassword = async (
  userSession: UserDataType,
  passwordData: UserDataType,
  newPassword: Function
) => {
  try {
    await newPassword({
      variables: {
        user_data: {
          password: passwordData.password
        },
        user_id: userSession.id,
      },
      context: { ms: microServices.backend },
    })
    return { succes: true }
  } catch {
    return { succes: false }
  }
}
