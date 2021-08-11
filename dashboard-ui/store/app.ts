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
    private profileLoaded: boolean = false

    // getters
    get getBotLoaded() {
      return this.botLoaded
    }

    get getProfileLoaded() {
      return this.profileLoaded
    }

    // mutations
    @VuexMutation
    mutateBotLoaded(value: boolean) {
      this.botLoaded = value
    }

    @VuexMutation
    mutateProfileLoaded(value: boolean) {
      this.profileLoaded = value
    }
}
