<script lang="ts">
  import { onMount } from 'svelte'
  import Tailwind from './lib/Tailwind.svelte'
  import Auth from './services/auth'
  import { userStore } from './stores/auth'

  onMount(async() => {

    const auth = new Auth
    await auth.init()
    await auth.login()

    console.log(userStore)
  })
</script>

<Tailwind />

