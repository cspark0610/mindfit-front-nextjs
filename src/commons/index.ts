export const regex = {
  minSize: /(?=.{8,})/,
  hasLetters: /(?=.*[a-z])/,
  hasNumbers: /(?=.*[0-9])/,
  hasSpecials: /(?=.*[$&+,:;=?@#|'<>.^*()%!-])/,
}

export const regexValidation = (data: string) => {
  const minSize = regex.minSize.test(data)
  const hasLetters = regex.hasLetters.test(data)
  const hasNumbers = regex.hasNumbers.test(data)
  const hasSpecials = regex.hasSpecials.test(data)

  return { minSize, hasLetters, hasNumbers, hasSpecials }
}
