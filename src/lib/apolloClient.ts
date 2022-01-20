// main tools
import { ApolloClient, InMemoryCache, ApolloLink, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { getMainDefinition } from '@apollo/client/utilities'
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
      headers: { ...headers, authorization: token ? `JWT ${token}` : '' },
    }
  })

  // @ts-ignore
  const link = uriMapper.concat(apolloHeaders.concat(httpLink))

  const myLink = process.browser
    ? split(({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      }, link)
    : link

  const client = new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: myLink,
    cache: new InMemoryCache(),
  })

  return client
}
