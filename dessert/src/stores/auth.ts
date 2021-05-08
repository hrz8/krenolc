import type { AuthUserStore } from '../services/auth'
import { writable } from 'svelte/store'

export const user = writable({} as AuthUserStore)
export const accessToken = writable('')
