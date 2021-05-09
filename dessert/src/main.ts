import 'virtual:windi.css'
import App from './App.svelte'

const elem = document.getElementById('app')
const app = new App({
  target: elem || document.body
})

export default app
