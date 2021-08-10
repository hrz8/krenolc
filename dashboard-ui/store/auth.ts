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
  private accessToken: string = ''

  // getters
  get getUserData() {
    return this.userData
  }

  // mutations
  @VuexMutation
  mutateUserData(userData: any) {
    this.userData = userData
  }

  // actions
  @VuexAction({
    rawError: true
  })
  create(payload: any) {
    this.mutateUserData(payload)
  }
}
