<script lang="ts" context="module">
  import type SvelteKit from '@sveltejs/kit'

  export const load: SvelteKit.Load = async ({ page }) => {
    const hasBeenRedirected =
      page.query.has('code') && page.query.has('state')
    const errorOccured =
      page.query.has('error') && page.query.has('error_description')

    // if (errorOccured) {
    //   const errMsg = (new URLSearchParams(window.location.search))
    //     .get('error_description')
    //   window.history.replaceState(
    //     {}, document.title, `${window.location.pathname}#/`
    //   )
    //   return
    // }

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

  export let hasBeenRedirected
  export let errorOccured

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
</script>

<Styles />

<main>
  <Sidebar />
  <div class="container-fluid">
    <div class="row">
      <slot></slot>
    </div>
  </div>
</main>

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