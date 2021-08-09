import {
  Vue, Component, Mixins
} from 'vue-property-decorator'
import { Plugin } from '@nuxt/types'
import createAuth0Client, {
  Auth0Client, Auth0ClientOptions, User as Auth0User
} from '@auth0/auth0-spa-js'

abstract class IAuth {
  token?: string
  user?: Auth0User | null
  isAuthenticated?: boolean
}
@Component
export class Auth0Mixin extends Vue implements IAuth {
  private auth0: Auth0Client | null = null

  token?: string
  user?: Auth0User | null
  isAuthenticated?: boolean

  async initializeAuth0Client() {
    const clientOptions: Auth0ClientOptions = {
      domain          : 'dev-q3imkb6d.us.auth0.com',
      client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
      audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
      useRefreshTokens: true,
      redirect_uri    : window.location.href,
      cacheLocation   : 'localstorage'
    }
    this.auth0 = await createAuth0Client(clientOptions)

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
        this.token = await this.auth0.getTokenSilently(clientOptions)
      }

      const hasAuthenticated = await this.auth0.isAuthenticated()
      this.isAuthenticated = hasAuthenticated
      if (hasAuthenticated){
        this.user = await this.auth0.getUser()
      } else if (!this.user && !this.isAuthenticated) {
        this.auth0.loginWithRedirect()
      }
    } catch (e) {
      // console.error(e)
    }
  }
}

@Component
export class AuthComponent extends Mixins(Auth0Mixin) implements IAuth {
  token: string = '';
  user: Auth0User | null= null;
  isAuthenticated: boolean = false;

  async created() {
    await this.initAuthProvider()
  }

  async initAuthProvider() {
    await this.initializeAuth0Client()
  }
}

const AuthPlugin: Plugin = (_, inject) => {
  inject('auth', new AuthComponent())
}

export default AuthPlugin
