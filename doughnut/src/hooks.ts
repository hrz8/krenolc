import type SvelteKit from '@sveltejs/kit'

export const handle = async ({
  request,
  resolve
}: {
  request: SvelteKit.Request,
  resolve: (request: SvelteKit.Request) => Promise<SvelteKit.Response>
}): Promise<SvelteKit.Response> => {
  // before
  // request.locals.user = await getUserInformation(request.headers.cookie)
  // const auth0Client = await createAuth0Client(authOptions)
  // auth0Client.loginWithRedirect()

  const response = await resolve(request)

  // after
  response.headers['x-custom-header'] = 'potato'

  return response
}
