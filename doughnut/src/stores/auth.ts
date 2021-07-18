import type { AuthUserStore } from '$lib/auth'
import { writable } from 'svelte/store'

type AuthStore = {
  user: null | AuthUserStore;
  token: string;
  isAuthenticated: boolean
}

const authDefault = {
  user           : null as AuthUserStore,
  token          : '',
  isAuthenticated: false
}

function createAuth() {
  const {
    subscribe, set, update
  } = writable(authDefault as AuthStore)

  return {
    subscribe,
    login: ({ token, isAuthenticated }) => update((prev) => {
      if (isAuthenticated)
        return {
          ...prev,
          token,
          isAuthenticated
        }
      return authDefault
    }),
    setUser: (user) => update((prev) => ({
      ...prev,
      user
    })),
    logout: () => set(authDefault)
  }
}

export const auth = createAuth()
