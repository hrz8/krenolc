import type SvelteKit from '@sveltejs/kit'

export const handle: SvelteKit.Handle = async ({
  request,
  resolve
}) => {
  // before
  // request.locals.user = await getUserInformation(request.headers.cookie)
  // const auth0Client = await createAuth0Client(authOptions)
  // auth0Client.loginWithRedirect()
  // console.log('request.headers.cookie', request.headers.cookie)
  // const cookies = cookie.parse(request.headers.cookie || '')
  // console.log('cookies', cookies)
  // request.locals.token = cookies.token || 'token000'

  const response = await resolve(request)

  // after
  // response.headers['x-custom-header'] = 'potato'

  return response
}

// export const getSession = (request: SvelteKit.Request): { token: any } => {
//   return {
//     token: request.locals.token
//   }
// }
