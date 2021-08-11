import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation
} from 'nuxt-property-decorator'

  @Module({
    name        : 'app',
    stateFactory: true,
    namespaced  : true
  })
export default class AppStoreModule extends VuexModule {
    // state
    private botLoaded: boolean = false
    private userProfileLoaded: boolean = false

    // getters
    get getBotLoaded() {
      return this.botLoaded
    }

    get getUserProfileLoaded() {
      return this.userProfileLoaded
    }

    // mutations
    @VuexMutation
    mutateBotLoaded(value: boolean) {
      this.botLoaded = value
    }

    @VuexMutation
    mutateUserProfileLoaded(value: boolean) {
      this.userProfileLoaded = value
    }
}
