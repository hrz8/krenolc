import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation
  // getModule
} from 'nuxt-property-decorator'

// import AppStore from './app'

@Module({
  name        : 'auth',
  stateFactory: true,
  namespaced  : true
})
export default class AuthStoreModule extends VuexModule {
  private isAuthenticated: boolean = false
  private userData: any = {}
  private userAccessToken: string = ''

  // getters
  get getIsAuthenticated() {
    return this.isAuthenticated
  }

  get getUserData() {
    return this.userData
  }

  get getUserAccessToken() {
    return this.userAccessToken
  }

  // mutations
  @VuexMutation
  mutateIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated
  }

  @VuexMutation
  mutateUserData(data: any) {
    this.userData = data
  }

  @VuexMutation
  mutateUserAccessToken(token: string) {
    this.userAccessToken = token
  }

  // actions
  @VuexAction({
    rawError: true
  })
  create(payload: { isAuthenticated: boolean; user: any; token: string }) {
    this.mutateIsAuthenticated(payload.isAuthenticated)
    this.mutateUserData(payload.user)
    this.mutateUserAccessToken(payload.token)
    this.store.commit('app/mutateUserProfileLoaded', true)
    // getModule(AppStore, this.store as any)
    //   .mutateUserProfileLoaded(true)
  }
}
