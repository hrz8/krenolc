<!-- <script lang="ts" context="module">
  import createAuth0Client, {
    Auth0Client,
    Auth0ClientOptions
  } from '@auth0/auth0-spa-js'

  const authOptions: Auth0ClientOptions = {
    domain          : 'dev-q3imkb6d.us.auth0.com',
    client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
    audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
    useRefreshTokens: true,
    redirect_uri    : '/'
  }

  export async function load({
    page, fetch, session, context
  }) {
    const auth0Client = await createAuth0Client(authOptions)
    auth0Client.getTokenWithPopup()
  }
</script> -->
<script lang="ts">
  import createAuth0Client, {  Auth0Client } from '@auth0/auth0-spa-js'
  import { onMount } from 'svelte'
  import { Styles } from 'sveltestrap'

  import Sidebar from '../components/sidebar.svelte'

  onMount(async () => {
    const authOptions = {
      domain          : 'dev-q3imkb6d.us.auth0.com',
      client_id       : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
      audience        : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
      useRefreshTokens: true,
      redirect_uri    : `${window.location.href}login`
    }
    const auth0Client = await createAuth0Client(authOptions)
    await auth0Client.loginWithRedirect()
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