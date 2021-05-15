<script lang="ts">
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'

  import { darkMode as darkModeStore } from './stores/util'
  import { isAuthenticated as isAuthenticatedStore } from './stores/auth'

  import routes from './routes'

  import Navbar from './components/Navbar.svelte'
  import Sidebar from './components/Sidebar.svelte'
  import AuthFactory from './services/auth'

  onMount(async () => {
    await AuthFactory.init()
  })
</script>

{#if !$isAuthenticatedStore}
  <div>
    Loading...
  </div>
{:else}
  <div class="{$darkModeStore ? 'dark' : '' } md:flex flex-col md:flex-row md:min-h-screen w-full">
    <Sidebar />

    <div class="flex-auto">
      <Navbar />
      <Router {routes} />
    </div>
  </div>
{/if}
