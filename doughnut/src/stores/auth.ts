import { writable } from 'svelte/store'
import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'
import _omit from 'lodash/omit'

import { loadingMsg as loadingMsgStore } from './common'
import { Rest } from '$lib/rest'

type User = {
  id: string;
  email: boolean;
  name: string;
  lastLogin: string;
}

type AuthStore = {
  user: null | User;
  token: string;
  isAuthenticated: boolean
}

const authDefault = {
  user           : null as User,
  token          : '',
  isAuthenticated: false
}

function createAuth() {
  const {
    subscribe, set, update
  } = writable(authDefault as AuthStore)

  return {
    subscribe,
    login: ({ token, isAuthenticated }) => update((prev) => {
      if (isAuthenticated)
        return {
          ...prev,
          token,
          isAuthenticated
        }
      return authDefault
    }),
    setUser: (user) => update((prev) => ({
      ...prev,
      user
    })),
    logout: () => set(authDefault)
  }
}

export const auth = createAuth()

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
      const errMsg = (new URLSearchParams(window.location.search))
        .get('error_description')
      loadingMsgStore.set(errMsg || 'Unknown Error')
      return
    }

    const isAuthenticated = await this.client.isAuthenticated()
    if (isAuthenticated) {
      const token = await this.client.getTokenSilently()
      auth.login({
        token,
        isAuthenticated
      })
      return
    }
    await this.client.loginWithRedirect()
  }

  public static async load(token: string): Promise<User & {
    bots: string[];
    defaultBot: any;
  }> {
    const result = await Rest.invoke<User & {
      bots: string[];
      defaultBot: any
    }>('auth.login', {
      token
    })
    const userResponse = result.data
    const user = _omit(userResponse, [
      'defaultBot',
      'bots'
    ])
    auth.setUser(user)
    return userResponse
  }

  public static logout(): void {
    auth.logout()
    return this.client.logout()
  }
}
