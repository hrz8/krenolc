import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'
import {
  user as userStore,
  accessToken as tokenStore,
  isAuthenticated as isAuthenticatedStore
} from '../stores/auth'

export type AuthUserStore = {
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  updated_at: string;
}

export default class AuthFactory {
  private static client: Auth0Client = {} as Auth0Client
  private static user: AuthUserStore | null= {} as AuthUserStore
  public static token = ''

  public static async init(options: Auth0ClientOptions): Promise<void> {
    // create new instance of auth0 client
    this.client = await createAuth0Client(options)

    const hasBeenRedirected =
      window.location.search.includes('code=') &&
      window.location.search.includes('state=')

    if (hasBeenRedirected) {
      await this.client.handleRedirectCallback()
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // user already authiticated, store user data into store
    const isAuthenticated = await this.client.isAuthenticated()
    isAuthenticatedStore.set(isAuthenticated)
    isAuthenticated
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
      const response = await fetch('http://localhost:3009/api/login', {
        method : 'POST',
        headers: {
          'Accept'      : 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: this.user
        })
      })
    } catch (err) {
      console.log(err)
    }

  }
}
