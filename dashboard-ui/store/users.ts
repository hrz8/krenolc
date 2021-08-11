import {
  Module,
  VuexModule,
  VuexAction,
  VuexMutation
} from 'nuxt-property-decorator'

@Module({
  name        : 'users',
  stateFactory: true,
  namespaced  : true
})
export default class UserStoreModule extends VuexModule {
  // state
  private users: any[] = []

  // getters
  get getUsers() {
    return this.users
  }

  // mutations
  @VuexMutation
  setUsers(users: any[]) {
    this.users = users
  }

  // actions
  @VuexAction({
    rawError: true
  })
  async fetchUsersAsync() {
    const response = await this.store.$api.call('placeholder.users')
    this.setUsers(response)
  }
}
