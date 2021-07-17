import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'

import { user as userStore } from '../stores/auth'
import { promiseWrapper } from './helpers'
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
      return
    }

    const isAuthenticated = await this.client.isAuthenticated()
    const [user] = await  promiseWrapper(this.client.getUser)
    const [token] = await promiseWrapper(this.client.getTokenSilently)

    userStore.login({
      user,
      token,
      isAuthenticated
    })

    if (isAuthenticated)
      return

    await this.client.loginWithRedirect()
  }

  public static async load(token: string): Promise<void> {
    await Rest.invoke('auth.login', {
      token
    })
  }

  public static logout(): void {
    userStore.logout()
    return this.client.logout()
  }
}
