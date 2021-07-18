<script lang="ts" context="module">
  import type SvelteKit from '@sveltejs/kit'

  export const load: SvelteKit.Load = async ({ page }) => {
    const hasBeenRedirected =
      page.query.has('code') && page.query.has('state')
    const errorOccured =
      page.query.has('error') && page.query.has('error_description')

    return {
      props: {
        hasBeenRedirected,
        errorOccured
      }
    }
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte'
  import { Styles } from 'sveltestrap'

  import Sidebar from '../components/sidebar.svelte'
  import Navbar from '../components/navbar.svelte'
  import { Auth } from '$lib/auth'

  import {  loadingMsg as loadingMsgStore } from '../stores/common'
  import { auth as authStore } from '../stores/auth'
  import {
    usedBot as botStore, allBots as botsStore
  } from '../stores/bot'

  export let hasBeenRedirected
  export let errorOccured

  let isAuthenticated = false

  onMount(async () => {
    await Auth.init({
      domain          : 'dev-q3imkb6d.us.auth0.com',
      client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
      audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
      useRefreshTokens: true,
      redirect_uri    : window.location.href
    }, {
      redirected: hasBeenRedirected,
      error     : errorOccured
    })

    authStore.subscribe(async (data) => {
      isAuthenticated = data.isAuthenticated
      if (isAuthenticated && !data.user){
        const user = await Auth.load(data.token)
        botsStore.set(user.bots)
        console.log(user.defaultBot)
        botStore.set(user.defaultBot)
      }
    })

  })
</script>

{#if !isAuthenticated}
  <div>
    {$loadingMsgStore}
  </div>
{:else}
  <Styles />
  <main>
    <Sidebar />
    <div class="container-fluid">
      <div class="row">
        <Navbar />
        <slot></slot>
      </div>
    </div>
  </main>
{/if}

<style>
  main {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
    height: -webkit-fill-available;
    max-height: 100vh;
    overflow-x: auto;
    overflow-y: hidden;
  }
</style>