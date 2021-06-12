<script lang="ts">
  import AuthFactory from '@services/auth'

  import { Button } from 'sveltestrap/src'
  import type { ButtonColor } from 'sveltestrap/src/Button'

  const colors: ButtonColor[] = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark'
  ]

  function logout() {
    AuthFactory.logout()
  }
</script>

<!-- <button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700 focus:outline-none" on:click="{logout}">
  logout Button
</button> -->

{#each colors as color}
<div>
  <Button {color}>{color}</Button>
</div>
{/each}
<Button color="primary">primary2</Button>
