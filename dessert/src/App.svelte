<script lang="ts">
  import { onMount } from 'svelte'
  import Tailwind from './lib/Tailwind.svelte'
import AuthFactory from './services/auth'
  
  import { userStore } from './stores/auth'

  onMount(async() => {
    userStore.subscribe((userData) => {
      console.log(userData)
    })
  })

  function logout() {
    AuthFactory.logout()
  }

  function token() {
    const token = AuthFactory.token
    console.log(token)
  }
</script>

<Tailwind />
<button on:click="{token}">
  token
</button>
<button on:click="{logout}">
  logout
</button>
