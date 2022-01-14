// main tools
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// gql
import { initializeApolloClient } from 'lib/apollo'
import LOGIN from 'lib/mutations/Auth/login.gql'
import GET_USER_BY_ID from 'lib/queries/User/getById.gql'

// utils
import jwt_decoder from 'jwt-decode'

export default NextAuth({
  pages: { error: '/login' }, // custom error page with query string as ?error=
  session: { maxAge: 30 * 60 }, // initial value in seconds, logout on a half hour of inactivity
  secret: process.env.SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_PUBLIC_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
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
        const apolloClient = initializeApolloClient()

        const { data } = await apolloClient
          .mutate({
            variables: {
              data: {
                email: credentials?.email,
                password: credentials?.password,
              },
            },
            mutation: LOGIN,
          })
          .catch((err) => {
            throw new Error(err.graphQLErrors[0].message)
          })

        if (data.signIn) return data.signIn
        return null
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
      if (user) {
        token.backendRefresh = user.refreshToken as string
        token.backendToken = user.token as string
      }

      return Promise.resolve(token)
    },

    /**
     * @param session current session object
     * @param token User object if is imported by a database or a JWT if isn't
     *
     * @return session that will be returned to the client
     */
    session: async ({ session, token }) => {
      const decoded: { sub?: number; email?: string } = jwt_decoder(
        token.backendToken
      )

      if (decoded.sub) {
        const apolloClient = initializeApolloClient()

        const res = await apolloClient.query({
          variables: { id: decoded.sub },
          query: GET_USER_BY_ID,
        })

        session.token = token.backendToken
        session.refreshToken = token.backendRefresh
        session.user = { ...decoded, ...res.data.findUserById }
      }

      return Promise.resolve({ ...session })
    },
  },
})
