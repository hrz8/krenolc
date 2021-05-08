import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'
import { userStore } from '../stores/auth'

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
      this.token = await this.client.getTokenSilently(options)
    }

    // user already authiticated, store user data into store
    const isAuthenticated = await this.client.isAuthenticated()
    if (isAuthenticated) {
      await this.setUser()
      return
    }

    // otherwise, just request login
    await this.login()
  }

  private static async setUser(): Promise<void> {
    this.user = (await this.client.getUser() as AuthUserStore) || null
    userStore.set(this.user as AuthUserStore)
  }

  private static async login(): Promise<void> {
    if (!(Object.keys(this.client).length)) {
      userStore.set({} as AuthUserStore)
      return
    }
    await this.client.loginWithRedirect()
  }

  public static logout(): void {
    return this.client.logout()
  }
}
