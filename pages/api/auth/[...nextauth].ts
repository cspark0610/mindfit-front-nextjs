// main tools
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

// gql
import { initializeApolloClient } from 'lib/apollo'
import LOGIN from 'lib/mutations/Auth/login.gql'
import REFRESH_TOKEN from 'lib/mutations/Auth/refreshToken.gql'
import LOGIN_WITH_GOOGLE from 'lib/mutations/Auth/loginWithGoogle.gql'
import SIGNUP_WITH_GOOGLE from 'lib/mutations/Auth/signupWithGoogle.gql'
import GET_USER_BY_ID from 'lib/queries/User/getById.gql'

// utils
import jwt_decoder from 'jwt-decode'
import { microServices } from 'commons'
import moment from 'moment'
import { createApolloClient } from 'lib/apolloClient'

const SIGNUP_RRSS = {
  google: SIGNUP_WITH_GOOGLE,
}

const LOGIN_RRSS = {
  google: LOGIN_WITH_GOOGLE,
}

export default NextAuth({
  pages: { error: '/login' }, // custom error page with query string as ?error=
  session: { maxAge: 60 * 60 }, // initial value in seconds, logout on a half hour of inactivity
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
            context: { ms: microServices.backend },
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
     * @param user user received afther authorize method
     * @param account rrss account like google, facebook, etc.
     *
     * @return jwt that will be send to session callback
     */
    jwt: async ({ token, user, account }) => {
      if (user && account?.provider === 'credentials') {
        token.backendRefresh = user.refreshToken as string
        token.backendToken = user.token as string
      } else if (account) {
        const apolloClient = initializeApolloClient()

        try {
          await apolloClient
            .mutate({
              variables: { data: { token: account?.id_token } },
              mutation:
                LOGIN_RRSS[account?.provider as keyof typeof LOGIN_RRSS],
              context: { ms: microServices.backend },
            })
            .then(({ data }) => {
              token.backendRefresh = data.signInWithGoogle
                .refreshToken as string
              token.backendToken = data.signInWithGoogle.token as string
            })
        } catch (error) {
          try {
            await apolloClient
              .mutate({
                variables: { data: { token: account?.id_token } },
                mutation:
                  SIGNUP_RRSS[account?.provider as keyof typeof SIGNUP_RRSS],
                context: { ms: microServices.backend },
              })
              .then(({ data }) => {
                token.backendRefresh = data.signUpWithGoogle
                  .refreshToken as string
                token.backendToken = data.signUpWithGoogle.token as string
              })
          } catch (error: any) {
            throw new Error(error.graphQLErrors[0].message)
          }
        }
      } else {
        const now = moment(new Date())
        const apolloClient = createApolloClient(token.backendRefresh)
        const decoded: { exp: number } = jwt_decoder(token.backendToken)
        const expireTokenTime = new Date(decoded.exp * 1000)
        const timeToExpireToken = moment(expireTokenTime).add(-5, 'minutes')
        const expired = timeToExpireToken.diff(now, 'minutes')

        if (expired < 5) {
          const { data } = await apolloClient.mutate({
            mutation: REFRESH_TOKEN,
            context: { ms: microServices.backend },
          })

          token.backendRefresh = data.refreshToken.refreshToken
          token.backendToken = data.refreshToken.token
        }
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
          context: { ms: microServices.backend },
        })

        session.token = token.backendToken
        session.refreshToken = token.backendRefresh
        session.user = { ...decoded, ...res.data.findUserById }
      }

      return Promise.resolve({ ...session })
    },
  },
})
