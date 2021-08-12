import { Component } from 'nuxt-property-decorator'
import { Mixins } from 'vue-property-decorator'
import {
  Context,
  Plugin
} from '@nuxt/types'
import { AuthProvider } from './types'
import { Auth0Mixin } from './auth0'

@Component
export class AuthComponent extends Mixins(Auth0Mixin) {
  private context: Context | undefined

  public provider: AuthProvider = AuthProvider.AUTH0

  get user() {
    if (this.provider === AuthProvider.AUTH0) {
      return this.auth0User
    }
    return null
  }

  public async created() {
    await this.getProvider()
    await this.initProvider()
  }

  public async getProvider() {
    const response = await this.context!.$api.call('auth.getProvider')
    const provider = response.data?.authProvider || AuthProvider.AUTH0
    this.provider = provider
  }

  public async initProvider(): Promise<void> {
    if (this.provider === AuthProvider.AUTH0) {
      await this.initializeAuth0Client()
      if (!this.loading && !this.auth0User && !this.isAuthenticated) {
        await this.auth0Login()
      } else {
        this.context!.store.dispatch('auth/create', {
          user : this.user,
          token: this.token
        })
      }
    }
  }
}

const AuthPlugin: Plugin = (context, inject): void => {
  inject('auth', new AuthComponent({
    data: () => ({
      context
    })
  }))
}

export default AuthPlugin