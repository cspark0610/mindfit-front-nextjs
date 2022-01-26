// Commons
import { microServices, regexValidation } from 'commons'

export const INITIAL_STATE = {
  name: '',
  position: '',
  email: '',
}

export const verifyInviteColaboratorData = (
  colaboratorData: typeof INITIAL_STATE,
  fillFields: string,
  validEmail: string
) => {
  const validated = regexValidation(colaboratorData.email)
  if (
    !colaboratorData.name ||
    !colaboratorData.position ||
    !colaboratorData.email
  )
    return { message: fillFields }
  if (!validated.isEmail) return { message: validEmail }
  return { success: true }
}

export const saveColaborator = async (
  colaborator: typeof INITIAL_STATE,
  addColaborator: Function
) => {
  let saved = false

  try {
    const { data } = await addColaborator({
      variables: colaborator,
      context: { ms: microServices.backend },
    })
    saved = !!data
  } catch (error) {
    console.log(error)
  }

  return { saved }
}
