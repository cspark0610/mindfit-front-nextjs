// main tools
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { getToken } from 'commons'

/**
 * configure apollo for
 * create a new apollo client
 */
export const createApolloClient = () => {
  const httpLink = createUploadLink({
    fetch(uri, ctx) {
      return fetch(uri, ctx)
    },
  })

  //   list of microservices
  const microservicesUris = {
    backend: process.env.BASE_API_URL,
    strapi: process.env.BASE_STRAPI_URL,
  }

  //   mapper of the micro service selected
  const uriMapper = new ApolloLink((operation, forward) => {
    const { ms } = operation.getContext()
    operation.setContext({
      uri: microservicesUris[ms as keyof typeof microservicesUris],
    })

    return forward(operation)
  })

  const apolloHeaders = setContext(async (_, { headers }) => {
    const token = await getToken()

    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    }
  })

  // @ts-ignore
  const link = uriMapper.concat(apolloHeaders.concat(httpLink))

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link,
    cache: new InMemoryCache(),
  })

  return client
}
