import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'

import { user as userStore } from '../stores/auth'
import { loadingMsg as loadingMsgStore } from '../stores/common'
import { Rest } from './rest'

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

  public static async init(
    options: Auth0ClientOptions, condition: {
      redirected: boolean;
      error: boolean
    }
  ): Promise<void> {
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
      const errMsg = (new URLSearchParams(window.location.search))
        .get('error_description')
      loadingMsgStore.set(errMsg || 'Unknown Error')
      return
    }

    const isAuthenticated = await this.client.isAuthenticated()
    if (isAuthenticated) {
      const user = await this.client.getUser()
      const token = await this.client.getTokenSilently()
      userStore.login({
        user,
        token,
        isAuthenticated
      })
      return
    }
    await this.client.loginWithRedirect()
  }

  public static async load(token: string): Promise<void> {
    const result = await Rest.invoke('auth.login', {
      token
    })
    console.log(result)
  }

  public static logout(): void {
    userStore.logout()
    return this.client.logout()
  }
}
