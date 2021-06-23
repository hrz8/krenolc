import type { AuthUserStore } from '$lib/auth'
import { writable } from 'svelte/store'

export const user = writable(null as AuthUserStore)
export const accessToken = writable('')
export const isAuthenticated = writable(false)
