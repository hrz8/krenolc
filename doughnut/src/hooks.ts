import type SvelteKit from '@sveltejs/kit'
import cookie from 'cookie'

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
  // console.log('request.locals.token', request.locals.token)
  // console.log('request from hooks', request)

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
