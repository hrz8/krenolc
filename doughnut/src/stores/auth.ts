import type { AuthUserStore } from '$lib/auth'
import { writable } from 'svelte/store'

type UserStore = {
  user: null | AuthUserStore;
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
    login: ({ token, isAuthenticated }) => update((prev) => {
      if (isAuthenticated)
        return {
          ...prev,
          token,
          isAuthenticated
        }
      return userDefault
    }),
    setUser: (user) => update((prev) => ({
      ...prev,
      user
    })),
    logout: () => set(userDefault)
  }
}

export const user = createUser()