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
  if (
    !colaboratorData.fullName ||
    !colaboratorData.position ||
    !colaboratorData.department ||
    !colaboratorData.email
  )
    return { message: fillFields }
  if (!colaboratorData.email.includes('@'))
    return { message: validEmail }
  return { success: true }
}
