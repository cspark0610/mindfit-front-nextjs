import { regexValidation } from 'commons'

export const resetPasswordValidation = (
  hash: string,
  data: {
    password: string
    confirmPassword: string
  }
) => {
  const { minSize, hasLetters, hasNumbers, hasSpecials } = regexValidation(
    data.password
  )

  if (hash === '')
    return {
      showAlert: true,
      alertType: 'error',
      text: 'Por favor, solicite un cambio de contraseña e ingrese desde el enlace recibido en su correo',
    }

  if (data.password === '' && data.confirmPassword === '')
    return {
      showAlert: false,
      alertType: 'error',
      text: '',
    }

  if (data.password !== data.confirmPassword)
    return {
      showAlert: true,
      alertType: 'error',
      text: 'Las contraseñas no coinciden',
    }

  if (!minSize)
    return {
      showAlert: true,
      alertType: 'error',
      text: 'Contraseña muy corta',
    }

  if (!hasSpecials)
    return {
      showAlert: true,
      alertType: 'error',
      text: 'Debe ingresar al menos un caracter especial',
    }

  if (!hasLetters || !hasNumbers)
    return {
      showAlert: true,
      alertType: 'error',
      text: 'Debe ingresar al menos un caracter numerico o alfabetico',
    }

  return { alertType: 'success', showAlert: false, text: '' }
}
