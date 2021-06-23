import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'

// import { loadingMsg as loadingMsgStore } from '../stores/util'
import {
  user as userStore,
  accessToken as tokenStore,
  isAuthenticated as isAuthenticatedStore
} from '../stores/auth'
// import Rest from './rest/rest'
// import { HTTPMethod } from './rest/methods'

export type AuthUserStore = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
}

export class Auth {
  private static client: Auth0Client = {} as Auth0Client
  private static user: AuthUserStore | null= {} as AuthUserStore
  private static token = ''

  public static async init(
    options: Auth0ClientOptions, condition: {
      redirected: boolean; error: boolean
    }
  ): Promise<void> {
    // create new instance of auth0 client
    this.client = await createAuth0Client(options)

    if (condition.redirected) {
      await this.client.handleRedirectCallback()
      window.history.replaceState(
        {}, document.title, window.location.pathname
      )
    }

    if (condition.error) {
      window.history.replaceState(
        {}, document.title, window.location.pathname
      )
      return
    }

    const isAuthenticated = await this.client.isAuthenticated()
    isAuthenticatedStore.set(isAuthenticated)
    if (isAuthenticated) {
      this.token = await this.client.getTokenSilently()
      tokenStore.set(this.token)
      this.user = await this.client.getUser() as AuthUserStore
      userStore.set(this.user)
      return
    }
    // otherwise, just request login
    await this.client.loginWithRedirect()
  }

  public static logout(): void {
    return this.client.logout()
  }
}
