import type { AuthUserStore } from '$lib/auth'
import { writable } from 'svelte/store'

type UserStore = {
  user: AuthUserStore;
  token: string;
  isAuthenticated: boolean
}

const userDefault = {
  user           : null as AuthUserStore,
  token          : '',
  isAuthenticated: false
}

function createUser() {
  const {
    subscribe, set, update
  } = writable(userDefault as UserStore)

  return {
    subscribe,
    login: ({
      user, token, isAuthenticated
    }) => update(() => {
      if (isAuthenticated)
        return {
          user,
          token,
          isAuthenticated
        }
      return userDefault
    }),
    logout: () => set(userDefault)
  }
}

export const user = createUser()