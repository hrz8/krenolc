<script lang="ts">
  import { replace } from 'svelte-spa-router'
  import { onMount } from 'svelte'

  import type { AuthUserStore } from '../services/auth'
  import {
    user as userStore, accessToken as accessTokenStore
  } from '../stores/auth'

  import LogoutButton from '../components/Home/LogoutButton.svelte'

  let user = {} as AuthUserStore
  let token = ''

  onMount(async() => {
    if (!window.location.href.endsWith('#/')) {
      replace('#/')
    }
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

<div>
  <button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700" on:click="{showCredential}">
    credentials
  </button>
  <LogoutButton />
</div>
