import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import Users from '~/store/users'

export const plugins = [
  (store: Store<any>) => ({
    users: getModule(Users, store)
  })
]
