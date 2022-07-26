// main tools
import { useMemo } from 'react'
import { createApolloClient } from './apolloClient'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>

/**
 * initialize apollo client
 * this function can be used in server side functions
 * like getServerSideProps
 *
 * @param initialState
 */
export const initializeApolloClient = (
  initialState: NormalizedCacheObject = {}
) => {
  const _apolloClient: ApolloClient<NormalizedCacheObject> =
    apolloClient ?? createApolloClient()

  if (initialState) {
    const existingCache = _apolloClient.extract()
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }

  if (typeof window === 'undefined') return _apolloClient
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

/**
 * custom hook for use apollo client
 * in client side
 *
 * @param initialState
 */
export const useApollo = (initialState: NormalizedCacheObject) =>
  useMemo(() => initializeApolloClient(initialState), [initialState])
