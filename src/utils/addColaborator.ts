export const INITIAL_STATE = {
  fullName: '',
  position: '',
  department: '',
  email: '',
}

export const verifyInviteColaboratorData = (
  colaboratorData: typeof INITIAL_STATE
) => {
  if (
    !colaboratorData.fullName ||
    !colaboratorData.position ||
    !colaboratorData.department ||
    !colaboratorData.email
  )
    return { message: 'Por favor, complete todos los campos' }
  if (!colaboratorData.email.includes('@'))
    return { message: 'Por favor, ingrese un correo electronico valido' }
  return { success: true }
}
