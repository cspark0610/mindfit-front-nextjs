import { regexValidation } from 'commons'

export const INITIAL_STATE = {
  fullName: '',
  position: '',
  department: '',
  email: '',
}

export const verifyInviteColaboratorData = (
  colaboratorData: typeof INITIAL_STATE,
  fillFields: string,
  validEmail: string
) => {
  const validated = regexValidation(colaboratorData.email)
  if (
    !colaboratorData.fullName ||
    !colaboratorData.position ||
    !colaboratorData.department ||
    !colaboratorData.email
  )
    return { message: fillFields }
  if (!validated.isEmail) return { message: validEmail }
  return { success: true }
}
