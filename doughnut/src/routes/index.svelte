<script lang="ts">
  import { onMount } from 'svelte'

  import { user as userStore } from '../stores/auth'

  onMount(async() => {
    userStore.subscribe((data) => {
      console.debug({
        token: data.token
      })
    })
  })
</script>

<h1>Welcome to Krenolc</h1>
<p>This should be dashboard but you know....</p>
