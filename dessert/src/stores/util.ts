import { writable } from 'svelte/store'

export const darkMode = writable(Number(localStorage.getItem('darkMode')) || 0)
export const loadingMsg = writable('Loading...')
