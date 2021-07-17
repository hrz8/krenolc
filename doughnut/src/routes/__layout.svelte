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
  import { Auth } from '$lib/auth'

  import { loadingMsg as loadingMsgStore } from '../stores/common'
  import {  user as userStore } from '../stores/auth'

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

    userStore.subscribe(async (data) => {
      isAuthenticated = data.isAuthenticated
      if (isAuthenticated)
        await Auth.load(data.token)
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