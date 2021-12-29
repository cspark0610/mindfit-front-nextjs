export const validateUserSignup = (userData: any) => {
  if (
    !userData.firstName ||
    !userData.lastName ||
    !userData.email ||
    !userData.password ||
    !userData.profilePicture
  )
    return false
  return true
}
