import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import User from '~/store/users'

const initializer = (store: Store<any>) => ({
  user: getModule(User, store)
})
export const plugins = [initializer]
