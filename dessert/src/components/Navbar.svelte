<script>
  import Moonicon from '@/icons/Moonicon.svelte'
  import Sunicon from '@/icons/Sunicon.svelte'
  import { darkMode as darkModeStore } from '@stores/util'

  function toggleDarkMode() {
    darkModeStore.update(v => {
      localStorage.setItem('darkMode', Number(!v))
      return Number(!v)
    })
  }
</script>


<header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-row p-5 justify-end">
  
    <button class="focus:outline-none" on:click={toggleDarkMode}>
      {#if $darkModeStore}
        <Moonicon className={'w-8 h-8 md:w-10 md:h-10'} />
      {:else}
        <Sunicon className={'w-8 h-8 md:w-10 md:h-10'} />
      {/if}
    </button>
  </div>
</header>

<style>

</style>
