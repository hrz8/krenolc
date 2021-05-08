<script lang="ts">
  import { onMount } from 'svelte'
  import Tailwind from './lib/Tailwind.svelte'
  import type { AuthUserStore } from './services/auth'
  import AuthFactory from './services/auth'
  
  import {
    user as userStore, accessToken as accessTokenStore
} from './stores/auth'

  let user = {} as AuthUserStore
  let token = ''

  onMount(async() => {
    userStore.subscribe((data) => {
      user = data
    })
    accessTokenStore.subscribe((data) => {
      token = data
    })
  })

  function logout() {
    AuthFactory.logout()
  }

  function showCredential() {
    console.log({
      user,
      token
    })
  }
</script>

<Tailwind />
<button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700" on:click="{showCredential}">
  credentials
</button>
<button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700" on:click="{logout}">
  logout
</button>
