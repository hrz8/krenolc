import App from './App.svelte'

const el = document.getElementById('app')
const app = new App({
  target: el || document.body
})

export default app
