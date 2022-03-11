// commons
import { regexValidation } from 'commons'

// types
import { UserDataType } from 'types/models/User'

export const validateUserSignup = (userData: UserDataType) => {
  const { minSize, hasLetters, hasNumbers, hasSpecials } = regexValidation(
    userData.password as string
  )

  if (
    !userData.profilePicture ||
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !minSize ||
    !hasSpecials ||
    (!hasLetters && !hasNumbers)
  )
    return false

  return true
}
