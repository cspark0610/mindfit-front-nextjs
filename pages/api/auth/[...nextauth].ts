// main tools
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  pages: { error: '/login' }, // custom error page with query string as ?error=
  session: { maxAge: 30 * 60 }, // initial value in seconds, logout on a half hour of inactivity
  secret: process.env.SECRET,

  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: { email: { type: 'email' }, password: { type: 'password' } },

      /**
       * verify if the user is found in the backend
       *
       * @param credentials
       * @returns
       */
      async authorize(credentials) {
        if (credentials?.email === 'josejmvasquez@gmail.com')
          return Promise.resolve({ name: '1', image: '' })
        else return null
      },
    }),
  ],

  callbacks: {
    /**
     * @param token decrypted jwt
     * @param data user received afther authorize method
     *
     * @return jwt that will be send to session callback
     */
    jwt: async ({ token, user }) => {
      if (user) token.user = user

      return Promise.resolve(token)
    },

    /**
     * @param session current session object
     * @param token User object if is imported by a database or a JWT if isn't
     *
     * @return session that will be returned to the client
     */
    session: async ({ session, token }) => {
      if (token) session.user = token.user

      return Promise.resolve({ ...token, ...session })
    },
  },
})
