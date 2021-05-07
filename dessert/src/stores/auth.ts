import type { AuthUserStore } from '../services/auth'
import { writable } from 'svelte/store'

export const userStore = writable({} as AuthUserStore)
