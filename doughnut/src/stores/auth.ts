import type { Auth0Client } from '@auth0/auth0-spa-js'
import { writable } from 'svelte/store'

export const client = writable(null as Auth0Client)
export const user = writable({})
export const accessToken = writable('')
export const isAuthenticated = writable(false)
