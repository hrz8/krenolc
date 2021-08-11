import {
  Vue, Component
} from 'nuxt-property-decorator'
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions,
  User as Auth0User
} from '@auth0/auth0-spa-js'
import { AuthMixins } from './types'

@Component
export class Auth0Mixin extends Vue implements AuthMixins {
  // required
  public isAuthenticated = false
  public token = ''
  public loading = false

  // provider
  public auth0User: Auth0User | null = null
  public auth0: Auth0Client | null = null
  private clientOptions: Auth0ClientOptions = {
    domain          : 'dev-q3imkb6d.us.auth0.com',
    client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
    audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
    useRefreshTokens: true,
    redirect_uri    : window.location.href,
    cacheLocation   : 'localstorage'
  }

  private async authenticating(): Promise<void>{
    this.auth0User = (await this.auth0!.getUser()) || null
    this.token = await this.auth0!.getTokenSilently(this.clientOptions)
  }

  public async initializeAuth0Client(): Promise<void> {
    this.auth0 = await createAuth0Client(this.clientOptions)

    try {
      const hasBeenRedirected =
        window.location.search.includes('code=')
        && window.location.search.includes('state=')

      if (hasBeenRedirected) {
        const { appState } = await this.auth0.handleRedirectCallback()
        this.auth0OnRedirectCallback(appState)
        await this.authenticating()
      }

      this.isAuthenticated = await this.auth0.isAuthenticated()
      if (this.isAuthenticated) {
        await this.authenticating()
      }
    } catch (e) {
      // console.error(e)
    } finally {
      this.loading = true
    }
  }

  public auth0OnRedirectCallback(appState: any) {
    window.history.replaceState({}, document.title, window.location.pathname)
  };

  public async auth0Login(): Promise<void> {
    await this.auth0!.loginWithRedirect()
  }
}
