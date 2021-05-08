<script lang="ts">
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'

  import { darkMode as darkModeStore } from './stores/util'

  import Tailwind from './lib/Tailwind.svelte'
  import routes from './routes'

  import Navbar from './components/Navbar.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import type { Auth0ClientOptions } from '@auth0/auth0-spa-js'
  import AuthFactory from './services/auth'

  onMount(async () => {
    const authOptions: Auth0ClientOptions = {
      domain      : 'dev-q3imkb6d.us.auth0.com',
      client_id   : 'avCrjqvcJSwD4ydZlfyzz3vqA8qHMZRq',
      audience    : 'https://dev-q3imkb6d.us.auth0.com/api/v2/',
      redirect_uri: window.location.href
    }
    await AuthFactory.init(authOptions)
  })
</script>

<Tailwind />

<div class="{$darkModeStore ? 'dark' : '' } md:flex flex-col md:flex-row md:min-h-screen w-full">
  <Sidebar />

  <div class="flex-auto">
    <Navbar />
    <Router {routes} />
  </div>
</div>
