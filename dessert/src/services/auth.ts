import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'

import { loadingMsg as loadingMsgStore } from '../stores/util'
import {
  user as userStore,
  accessToken as tokenStore,
  isAuthenticated as isAuthenticatedStore
} from '../stores/auth'
import Rest from './rest/rest'
import { HTTPMethod } from './rest/methods'

export type AuthUserStore = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
}

const authOptions: Auth0ClientOptions = {
  domain          : 'dev-q3imkb6d.us.auth0.com',
  client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
  audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
  useRefreshTokens: true,
  redirect_uri    : window.location.href
}

export default class AuthFactory {
  private static client: Auth0Client = {} as Auth0Client
  private static user: AuthUserStore | null= {} as AuthUserStore
  public static token = ''

  public static async init(options?: Auth0ClientOptions): Promise<void> {
    // create new instance of auth0 client
    this.client = await createAuth0Client(options || authOptions)

    const hasBeenRedirected =
      window.location.search.includes('code=') &&
      window.location.search.includes('state=')

    const errorOccured =
      window.location.search.includes('error=') &&
      window.location.search.includes('error_description=')

    if (hasBeenRedirected) {
      await this.client.handleRedirectCallback()
      window.history.replaceState(
        {}, document.title, `${window.location.pathname}#/`
      )
    }

    if (errorOccured) {
      const errMsg = (new URLSearchParams(window.location.search))
        .get('error_description')
      loadingMsgStore.set(errMsg || 'Unknown Error')
      window.history.replaceState(
        {}, document.title, `${window.location.pathname}#/`
      )
      return
    }

    // user already authiticated, store user data into store
    const isAuthenticated = await this.client.isAuthenticated()
    isAuthenticatedStore.set(isAuthenticated)
    if (isAuthenticated) {
      await this.setUser()
      await this.setToken()
      await this.postLogin()
      return
    }

    // otherwise, just request login
    await this.login()
  }

  private static async setUser(): Promise<void> {
    const user = await this.client.getUser() as AuthUserStore
    this.user = user || null
    userStore.set(this.user as AuthUserStore)
  }

  private static async setToken(): Promise<void> {
    const token = await this.client.getTokenSilently()
    this.token = token
    tokenStore.set(this.token)
  }

  private static async login(): Promise<void> {
    await this.client.loginWithRedirect()
  }

  public static logout(): void {
    return this.client.logout()
  }

  public static async postLogin(): Promise<void> {
    try {
      const responseData = await Rest.fetch(HTTPMethod.POST, 'login', {
        user: this.user
      })
      console.log('[POST LOGIN]', responseData.message)
    } catch (err) {
      console.log(err)
    }

  }
}
