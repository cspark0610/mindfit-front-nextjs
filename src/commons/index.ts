import { getSession } from 'next-auth/react'

export const regex = {
  minSize: /(?=.{8,})/,
  hasLetters: /(?=.*[a-z])/,
  hasNumbers: /(?=.*[0-9])/,
  hasSpecials: /(?=.*[$&+,:;=?@#|'<>.^*()%!-])/,
  isEmail:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

export const regexValidation = (data: string) => {
  const minSize = regex.minSize.test(data)
  const hasLetters = regex.hasLetters.test(data)
  const hasNumbers = regex.hasNumbers.test(data)
  const hasSpecials = regex.hasSpecials.test(data)
  const isEmail = regex.isEmail.test(data)

  return { minSize, hasLetters, hasNumbers, hasSpecials, isEmail }
}

/**
 * getToken
 * Function to get Token saved in the localStorage of the app
 */
export const getToken = async (): Promise<string> => {
  const session = await getSession()
  return session?.accessToken as string
}

export const microServices = {
  backend: 'backend',
  strapi: 'strapi',
}
