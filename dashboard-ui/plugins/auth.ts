import {
  Vue, Component
} from 'nuxt-property-decorator'
import { Mixins } from 'vue-property-decorator'
import { Plugin } from '@nuxt/types'
import createAuth0Client, {
  Auth0Client, Auth0ClientOptions, User as Auth0User
} from '@auth0/auth0-spa-js'

export enum AuthProvider {
  AUTH0 = 'AUTH0',
  KEYCLOAK = 'KEYCLOAK',
}

@Component
class Auth0Mixin extends Vue {
  private auth0: Auth0Client | null = null
  private token: string = ''
  private clientOptions: Auth0ClientOptions = {
    domain          : 'dev-q3imkb6d.us.auth0.com',
    client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
    audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
    useRefreshTokens: true,
    redirect_uri    : window.location.href,
    cacheLocation   : 'localstorage'
  }

  public async initializeAuth0Client(superComponent: AuthComponent) {
    this.auth0 = await createAuth0Client(this.clientOptions)

    try {
      const hasBeenRedirected =
        window.location.search.includes('code=')
        && window.location.search.includes('state=')

      if (hasBeenRedirected) {
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        )
        this.token = await this.auth0.getTokenSilently(this.clientOptions)
      }

      const hasAuthenticated = await this.auth0.isAuthenticated()
      superComponent.isAuthenticated = hasAuthenticated
      if (hasAuthenticated){
        superComponent.user = (await this.auth0.getUser()) || null
      } else if (!superComponent.user && !superComponent.isAuthenticated) {
        this.auth0.loginWithRedirect()
      }
    } catch (e) {
      // console.error(e)
    }
  }

  public async getAuth0Token(): Promise<string> {
    return this.token
      || (await this.auth0?.getTokenSilently(this.clientOptions))
  }
}

@Component
export class AuthComponent extends Mixins(Auth0Mixin) {
  private ctx: any = {}
  public provider: AuthProvider = AuthProvider.AUTH0
  public user: Auth0User | null = null;
  public isAuthenticated: boolean = false;

  public async created() {
    await this.getProvider()
    await this.initProvider()
  }

  public async getProvider() {
    const response = await this.ctx.$api.call('auth.getProvider')
    const provider = response.data?.authProvider || AuthProvider.AUTH0
    this.provider = provider
  }

  public async initProvider() {
    if (this.provider === AuthProvider.AUTH0) {
      await this.initializeAuth0Client(this)
    }
  }

  public async getToken() {
    if (this.provider === AuthProvider.AUTH0) {
      return await this.getAuth0Token()
    }
  }
}

const AuthPlugin: Plugin = (context, inject) => {
  const authInstance = new AuthComponent({
    data: () => ({
      ctx: context
    })
  })
  inject('auth', authInstance)
}

export default AuthPlugin
