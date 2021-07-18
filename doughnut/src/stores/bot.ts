import { writable } from 'svelte/store'

export const usedBot = writable(null)
export const allBots = writable([])
