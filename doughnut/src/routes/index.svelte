<script lang="ts">
  import { onMount } from 'svelte'

  import { accessToken as accessTokenStore } from '../stores/auth'

  onMount(async() => {
    accessTokenStore.subscribe((data) => {
      console.debug({
        token: data
      })
    })
  })
</script>

<h1>Welcome to Krenolc</h1>
<p>This should be dashboard but you know....</p>
