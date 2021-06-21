<script lang="ts" context="module">
  export const load = ({ session }) => {
    console.log('session', session)
    return {
      props: {
        isAuthenticated: session.token !== 'token000'
      }
    }
  }
</script>

<script lang="ts">
  import createAuth0Client from '@auth0/auth0-spa-js'
  import { onMount } from 'svelte'
  import { Styles } from 'sveltestrap'

  import { client as authClientStore } from '../stores/auth'

  import Sidebar from '../components/sidebar.svelte'

  export let isAuthenticated

  onMount(async () => {
    console.log('isAuthenticated', isAuthenticated)
    if (!isAuthenticated) {
      const authOptions = {
        domain          : 'dev-q3imkb6d.us.auth0.com',
        client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
        audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
        useRefreshTokens: true,
        redirect_uri    : `${window.location.href}login`
      }
      const client = await createAuth0Client(authOptions)
  
      authClientStore.set(client)
      authClientStore.subscribe((cl) => cl.loginWithRedirect())
    }
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