<script>
  import Homeicon from '@/icons/Homeicon.svelte'
  import Usericon from '@/icons/Usericon.svelte'
  import { link } from 'svelte-spa-router'
  import active from 'svelte-spa-router/active'

  let open = false

  function toggleOpen() {
    open = !open
  }
</script>

<div class="flex flex-col w-full md:w-64 text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800 flex-shrink-0">
  <div class="flex-shrink-0 px-8 py-4 flex flex-row items-center justify-between">
    <a use:link href="/" class="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none dark:btn-sidebar-title">
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
      <Homeicon className={'h-6 w-6 inline-flex'} />
      <span class="ml-2">Home</span>
    </a>
    <a use:link href="/access-management" use:active={{
      path             : '/access-management',
      className        : 'bg-gray-200 dark:bg-gray-700',
      inactiveClassName: 'bg-transparent dark:bg-transparent'
    }} class="flex items-center px-4 py-2 mt-2 text-sm font-semibold rounded-lg focus:outline-none dark:btn-sidebar">
      <Usericon class={'h-6 w-6 inline-flex'} />
      <span class="ml-2">Access Management</span>
    </a>
  </nav>
</div>

<style>
  .btn-sidebar-title {
    @apply text-gray-900 dark:text-white;
  }
  .btn-sidebar {
    @apply dark:text-gray-200 text-gray-700;
    @apply dark:hover:text-white hover:text-gray-900;
    @apply dark:focus:bg-gray-600 focus:bg-gray-200;
    @apply dark:focus:text-white focus:text-gray-900;
  }
</style>
