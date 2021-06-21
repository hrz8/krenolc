import createAuth0Client, {
  Auth0Client,
  Auth0ClientOptions
} from '@auth0/auth0-spa-js'

export class Auth {
  public static client: Auth0Client = {} as Auth0Client

  public static async init(options: Auth0ClientOptions): Promise<void> {
    // create new instance of auth0 client
    this.client = await createAuth0Client(options)
    await this.client.loginWithRedirect()
  }

  public static logout(): void {
    return this.client.logout()
  }
}
