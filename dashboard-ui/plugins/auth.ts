import {
  Vue, Component
} from 'nuxt-property-decorator'
import { Mixins } from 'vue-property-decorator'
import { Plugin } from '@nuxt/types'
import createAuth0Client, {
  Auth0Client, Auth0ClientOptions, User as Auth0User
} from '@auth0/auth0-spa-js'

abstract class AuthAbstract {
  abstract token: string
  abstract user: Auth0User | null
  abstract isAuthenticated: boolean
}

@Component
export class Auth0Mixin extends Vue {
  private auth0: Auth0Client | null = null

  public async initializeAuth0Client(superComponent: AuthComponent) {
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
      }

      const hasAuthenticated = await this.auth0.isAuthenticated()
      superComponent.isAuthenticated = hasAuthenticated
      if (hasAuthenticated){
        superComponent.user = (await this.auth0.getUser()) || null
        superComponent.token = await this.auth0.getTokenSilently(clientOptions)
      } else if (!superComponent.user && !superComponent.isAuthenticated) {
        this.auth0.loginWithRedirect()
      }
    } catch (e) {
      // console.error(e)
    }
  }
}

@Component
export class AuthComponent extends Mixins(Auth0Mixin) implements AuthAbstract {
  public token: string = '';
  public user: Auth0User | null = null;
  public isAuthenticated: boolean = false;

  public async created() {
    await this.initAuthProvider()
  }

  public async initAuthProvider() {
    await this.initializeAuth0Client(this)
  }
}

const AuthPlugin: Plugin = async (context, inject) => {
  await context.store.dispatch('users/fetchUsers')
  const users = context.store.getters['users/getUsers']
  console.log('users', users)
  inject('auth', new AuthComponent())
}

export default AuthPlugin
