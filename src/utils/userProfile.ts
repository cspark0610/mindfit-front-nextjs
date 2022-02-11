// Commons
import { microServices } from 'commons'

// Types
import { UserDataType } from 'types/models/User'

export const initialState = (userData: UserDataType): UserDataType => {
  const name = userData.name?.split(' ')
  const INITIAL_STATE = {
    firstName: name ? name[0] : '',
    lastName: name ? name[1] : '',
    email: userData.email,
    password: userData.password,
    coachee: {
      profilePicture: userData.coachee?.profilePicture as File,
      position: userData.coachee?.position,
    },
  }
  return INITIAL_STATE
}

export const validateUserProfile = (userData: UserDataType) => {
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.coachee?.position ||
    !userData.coachee?.profilePicture
  )
    return false
  return true
}

export const saveData = async (
  data: UserDataType,
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
        user_id: data.id,
        coachee_data: userData.coachee,
        coachee_id: data.coachee?.id,
      },
      context: { ms: microServices.backend },
    })
    return { succes: true }
  } catch {
    return { succes: false }
  }
}

export const savePassword = async (
  data: UserDataType,
  passwordData: UserDataType,
  newPassword: Function
) => {
  try {
    await newPassword({
      variables: {
        user_data: {
          password: passwordData.password,
        },
        user_id: data.id,
      },
      context: { ms: microServices.backend },
    })
    return { succes: true }
  } catch {
    return { succes: false }
  }
}
