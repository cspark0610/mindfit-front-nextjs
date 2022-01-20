import { getSession } from 'next-auth/react'

/**
 * getToken
 * Function to get Token saved in the localStorage of the app
 */
export const getToken = async (): Promise<string> => {
  const session = await getSession()
  return session?.accessToken as string
}
