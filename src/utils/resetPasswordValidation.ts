import { regexValidation } from 'commons'

export const resetPasswordValidation = (
  password: string,
  confirmation: string
) => {
  if (password.length >= 8 || confirmation.length >= 8) {
    //no send diff
    if (password === confirmation) {
      const { minSize, hasLetters, hasNumbers, hasSpecials } =
        regexValidation(password)
      //validate chars
      if (minSize && hasLetters && hasNumbers && hasSpecials) {
        //ok
        return { isValid: true }
      } else {
        //error
        return {
          isValid: false,
          message: 'La contraseña no cumple los requisitos',
        }
      }
    } else {
      //error
      return { isValid: false, message: 'Las contraseñas no coinciden' }
    }
  } else {
    //error
    return {
      isValid: false,
      message: 'La contraseña debe tener minimo 8 caracteres',
    }
  }
}
