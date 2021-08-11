import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation
} from 'nuxt-property-decorator'

@Module({
  name        : 'auth',
  stateFactory: true,
  namespaced  : true
})
export default class AuthStoreModule extends VuexModule {
  private userData: any = {}
  private userAccessToken: string = ''

  // getters
  get getUserData() {
    return this.userData
  }

  get getUserAccessToken() {
    return this.userAccessToken
  }

  // mutations
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
  create(payload: { user: any; token: string }) {
    this.mutateUserData(payload.user)
    this.mutateUserAccessToken(payload.token)
  }
}
