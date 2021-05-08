<script>
  import { darkMode as darkModeStore } from '../stores/util'

  function toggleDarkMode() {
    darkModeStore.update(v => !v)
  }
</script>


<header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-row p-5 justify-end">
  
    <button on:click={toggleDarkMode}>
      {#if $darkModeStore}
        <svg class="w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      {:else}
        <svg class="w-8 h-8 md:w-10 md:h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      {/if}
    </button>
    
    <!-- <button class="bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
      Button
    </button> -->
  </div>
</header>

<style>
  input:checked ~ .dot {
    transform: translateX(100%);
    background-color: #fff;
  }
</style>
