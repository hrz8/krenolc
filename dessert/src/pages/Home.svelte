<script lang="ts">
  import LogoutButton from '../components/Home/LogoutButton.svelte'
  import { onMount } from 'svelte'

  import type { AuthUserStore } from '../services/auth'
  import {
    user as userStore, accessToken as accessTokenStore
} from '../stores/auth'

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

  function showCredential() {
    console.log({
      user,
      token
    })
  }
</script>

<button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700" on:click="{showCredential}">
  credentials
</button>
<LogoutButton />