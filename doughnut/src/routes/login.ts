import { Auth } from '$lib/auth'
import type SvelteKit from '@sveltejs/kit'

import { client as authClientStore } from '../stores/auth'

const BASE_URL = import.meta.env.VITE_BASE_URL.toString()

export const get = async (
  { query, host }: { query: URLSearchParams; host: string }
): Promise<SvelteKit.EndpointOutput> => {
  const hasBeenRedirected = query.has('code') && query.has('state')
  const errorOccured = query.has('error') && query.has('error_description')

  authClientStore.subscribe(async (cl) => {
    console.log('Kesini!!!')
    const isAuthenticated = await cl.isAuthenticated()
    const user = await cl.getUser()
    const token = await cl.getTokenSilently()
    console.log({
      isAuthenticated,
      user,
      token
    })
  })
  return {
    status : 302,
    headers: {
      location    : BASE_URL,
      'set-cookie': 'token=token123; Path=/; HttpOnly'
    }
  }
}
