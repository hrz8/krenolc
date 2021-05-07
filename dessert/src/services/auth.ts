import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js'
import { userStore } from '../stores/auth'

export type AuthUserStore = {
  name: string;
  email: string;
  email_verified: boolean;
  token: string;
  birthdate?: string;
  zoneinfo?: string;
  locale?: string;
}

export default class Auth {
  private client: Auth0Client = {} as Auth0Client

  public async init(): Promise<void> {
    this.client = await createAuth0Client({
      domain: process.env.AUTH0_DOMAIN || 'domain.auth0.com',
      client_id: process.env.AUTH0_CLIENT_ID || 'somerandomstring',
      redirect_uri: 'http://localhost:8009/'
    })
  }

  public async login(): Promise<void> {
    if (!(Object.keys(this.client),length)) {
      userStore.set({} as AuthUserStore)
      return
    }
    await this.client.loginWithRedirect()
    const user = await this.client.getUser()
    userStore.set(user as AuthUserStore)
  }

  public logout(): void {
    return this.client.logout()
  }
}
