<script>
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'

  let open = false

  function toggleOpen() {
    open = !open
  }
</script>

<div class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800 flex-shrink-0">
  <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
    <a use:link href="/" class="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline">
      Krenolc
    </a>
    <button class="md:hidden rounded-lg focus:outline-none focus:shadow-outline" on:click="{toggleOpen}">
      <svg fill="currentColor" viewBox="0 0 20 20" class="w-6 h-6">
        {#if open}
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        {:else}
          <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
        {/if}
      </svg>
    </button>
  </div>
  <nav class="flex-grow md:block px-4 pb-4 md:pb-0 md:overflow-y-auto {open ? 'block': 'hidden'}">
    <a use:link href="/" use:active={{
      path             : '/',
      className        : 'bg-gray-200 dark:bg-gray-700',
      inactiveClassName: 'bg-transparent dark:bg-transparent'
    }} class="flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg focus:outline-none dark:btn-sidebar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-flex" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span class="ml-2">Home</span>
    </a>
    <a use:link href="/access-management" use:active={{
      path             : '/access-management',
      className        : 'bg-gray-200 dark:bg-gray-700',
      inactiveClassName: 'bg-transparent dark:bg-transparent'
    }} class="flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg focus:outline-none dark:btn-sidebar">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <span class="ml-2">Access Management</span>
    </a>
  </nav>
</div>

<style>
  .btn-sidebar {
    @apply dark:text-gray-200 text-gray-700;
    @apply dark:hover:text-white hover:text-gray-900;
    @apply dark:focus:bg-gray-600 focus:bg-gray-200;
    @apply dark:focus:text-white focus:text-gray-900;
  }
</style>
