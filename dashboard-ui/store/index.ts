import { getModule } from 'nuxt-property-decorator'
import { Store } from 'vuex'
import App from '~/store/app'
import Auth from '~/store/auth'
import Users from '~/store/users'

export const plugins = [
  (store: Store<any>) => ({
    app  : getModule(App, store),
    auth : getModule(Auth, store),
    users: getModule(Users, store)
  })
]
