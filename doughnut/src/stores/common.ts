import { writable } from 'svelte/store'

export const loadingMsg = writable('Loading...')
export const bots = writable([])
