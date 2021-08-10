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
  async fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    this.setUsers(users)
  }
}
