// main tools
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

/**
 * configure apollo for
 * create a new apollo client
 */
export const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri: 'https://spacexdata.herokuapp.com/graphql' }),
    cache: new InMemoryCache(),
  })
