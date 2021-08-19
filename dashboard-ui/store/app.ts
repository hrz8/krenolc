import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation
} from 'nuxt-property-decorator'
import { gql } from 'graphql-tag'

  @Module({
    name        : 'app',
    stateFactory: true,
    namespaced  : true
  })
export default class AppStoreModule extends VuexModule {
    // state
    private botLoaded: boolean = false
    private userProfileLoaded: boolean = false
    private bot: any = {}

    // getters
    get getBotLoaded() {
      return this.botLoaded
    }

    get getUserProfileLoaded() {
      return this.userProfileLoaded
    }

    get getBot() {
      return this.bot
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

    @VuexMutation
    mutateBot(value: any) {
      this.bot = value
    }

    // actions
    @VuexAction({
      rawError: true
    })
    async fetchBotAsync() {
      const $apollo = this.store.app.apolloProvider.defaultClient
      const { data: { BotAPI: { bot } } } = await $apollo.query({
          query: gql`
            query GetBot {
              BotAPI {
                bot {
                  name
                  modules
                  metadata
                }
              }
            }
          `
        })
      this.mutateBot(bot)
      this.mutateBotLoaded(true)
    }
}
