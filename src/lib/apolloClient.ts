// main tools
import {
  split,
  HttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { setContext } from '@apollo/client/link/context'
import { getToken, microServices } from 'commons'
import { createClient } from 'graphql-ws'

/**
 * configure apollo for
 * create a new apollo client
 */
export const createApolloClient = (accessToken: string | null = null) => {
  const httpLink = new HttpLink({ fetch: (uri, ctx) => fetch(uri, ctx) })
  const wsLink =
    typeof window !== 'undefined'
      ? new GraphQLWsLink(createClient({ url: 'ws://localhost:5000/graphql' }))
      : null

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

  const apolloHeaders = setContext(async (_, { ms, headers }) => {
    let token = null
    if (typeof window !== 'undefined') {
      if (ms === microServices.backend) token = await getToken()
      else token = process.env.NEXT_PUBLIC_STRAPI_TOKEN
    } else if (ms === microServices.strapi)
      token = process.env.NEXT_PUBLIC_STRAPI_TOKEN
    else token = accessToken

    return {
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    }
  })

  const link = uriMapper.concat(apolloHeaders.concat(httpLink))

  const splitLink =
    typeof window !== 'undefined'
      ? split(
          ({ query }) => {
            const definition = getMainDefinition(query)
            return (
              definition.kind === 'OperationDefinition' &&
              definition.operation === 'subscription'
            )
          },
          wsLink as GraphQLWsLink,
          link
        )
      : link

  const client = new ApolloClient({
    link: splitLink,
    ssrMode: typeof window === 'undefined',
    cache: new InMemoryCache({ addTypename: false }),
  })

  return client
}
