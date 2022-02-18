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
  return session?.token as string
}

export const microServices = {
  backend: 'backend',
  strapi: 'strapi',
}

export const formatDate = (date: string | Date) =>
  typeof date === 'string' ? new Date(date) : date

export const getRandomColor = (colors: string[]) => {
  const num = (Math.floor(Math.random() * 4) * 4).toString(16)
  const characters = ['0', 'F', num]
  let color = '#'

  for (var i = 0; i < 3; i++) {
    const pos = Math.floor(Math.random() * characters.length)
    color += characters[pos]
    characters.splice(pos, 1)
  }

  //para evitar que se repitan colores
  if (colors.includes(color)) getRandomColor(colors)
  else colors.push(color)

  return color
}
