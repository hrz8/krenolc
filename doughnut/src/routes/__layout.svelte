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
  import {
    page, session
  } from '$app/stores'
  import { Styles } from 'sveltestrap'
  

  import Sidebar from '../components/sidebar.svelte'
  import Navbar from '../components/navbar.svelte'
  import { Auth } from '../stores/auth'

  import { loadingMsg as loadingMsgStore } from '../stores/common'
  import { auth as authStore } from '../stores/auth'
  import { Bot } from '../stores/bot'

  export let hasBeenRedirected
  export let errorOccured

  let loading = true
  let path = '/'

  let token = null
  let isAuthenticated = false
  let hasBots = false

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
  })

  page.subscribe((data) => {
    path = data.path
  })

  session.subscribe((data) => {
    token = data?.token
    hasBots = data?.hasBots
    isAuthenticated = data?.isAuthenticated
  })

  authStore.subscribe(async (data) => {
    if (data.isAuthenticated && !token) {
      const user = await Auth.load(data.token)
      session.update((session) => ({
        ...session,
        token          : data.token,
        hasBots        : !!user.bots.length,
        isAuthenticated: data.isAuthenticated
      }))
      await Bot.load({
        bots   : user.bots,
        default: user.defaultBot
      })
    }
    loading = false
  })
</script>

{#if !isAuthenticated || loading}
  <div>{$loadingMsgStore}</div>
{:else}
  <Styles />
  <main>
    <Sidebar {path} disabled={!hasBots} />
    <div class="container-fluid">
      <div class="row">
        {#if !hasBots}
          Create your bot
        {:else}
          <Navbar />
          <slot></slot>
        {/if}
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
