import type SvelteKit from '@sveltejs/kit'

export const get = (
  { query, host }: { query: URLSearchParams; host: string }
): SvelteKit.EndpointOutput => {
  const hasBeenRedirected = query.has('code') && query.has('state')
  const errorOccured = query.has('error') && query.has('error_description')

  return {
    status : 302,
    headers: {
      location: `http://${host}`
    }
  }
}
