// main tools
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { getToken } from 'commons'

/**
 * configure apollo for
 * create a new apollo client
 */
export const createApolloClient = (accessToken: string | null = null) => {
  const httpLink = createUploadLink({
    fetch: (uri, ctx) => fetch(uri, ctx),
  })

  // list of microservices
  const microservicesUris = {
    strapi: process.env.BASE_STRAPI_URL,
    backend: process.env.BASE_API_URL,
  }

  // mapper of the micro service selected
  const uriMapper = new ApolloLink((operation, forward) => {
    const { ms } = operation.getContext()
    operation.setContext({
      uri: microservicesUris[ms as keyof typeof microservicesUris],
    })

    return forward(operation)
  })

  const apolloHeaders = setContext(async (_, { headers }) => {
    let token = null
    if (typeof window !== 'undefined') token = await getToken()
    else token = accessToken

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