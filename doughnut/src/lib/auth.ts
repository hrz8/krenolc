import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'
import _omit from 'lodash/omit'

import { auth as authStore } from '../stores/auth'
import {
  loadingMsg as loadingMsgStore,
  bots as botsStore
} from '../stores/common'
import { Rest } from './rest'

export type AuthUserStore = {
  id: string;
  email: boolean;
  name: string;
  lastLogin: string;
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
      const token = await this.client.getTokenSilently()
      authStore.login({
        token,
        isAuthenticated
      })
      return
    }
    await this.client.loginWithRedirect()
  }

  public static async load(token: string): Promise<void> {
    const result = await Rest.invoke<
      AuthUserStore & { bots: string[]; defaultBot: any }
    >('auth.login', {
      token
    })
    const userResponse = result.data
    const user = _omit(userResponse, [
      'defaultBot',
      'bots'
    ])
    authStore.setUser(user)
    botsStore.set(userResponse.bots || [])
  }

  public static logout(): void {
    authStore.logout()
    return this.client.logout()
  }
}
