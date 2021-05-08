import type { Auth0ClientOptions } from '@auth0/auth0-spa-js'
import App from './App.svelte'
import AuthFactory from './services/auth'

const authOptions: Auth0ClientOptions = {
  domain      : 'dev-q3imkb6d.us.auth0.com',
  client_id   : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
  audience    : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
  redirect_uri: window.location.href
}
await AuthFactory.init(authOptions)

const elem = document.getElementById('app')
const app = new App({
  target: elem || document.body
})

export default app
