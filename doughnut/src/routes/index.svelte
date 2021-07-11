<script lang="ts">
  import { onMount } from 'svelte'

  import { Button } from 'sveltestrap'

  import { accessToken as accessTokenStore } from '../stores/auth'


  let token = ''

  onMount(async() => {
    accessTokenStore.subscribe((data) => {
      token = data
    })
  })

  function showCredential() {
    console.debug({
      token
    })
  }
</script>

<h1>Welcome to Krenolc</h1>
<p>This should be dashboard but you know....</p>
<div>
  <Button color="primary" on:click={showCredential}>Credentials</Button>
</div>
