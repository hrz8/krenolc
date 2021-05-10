<script lang="ts">
  import AuthFactory from '@services/auth'

  function logout() {
    AuthFactory.logout()
  }
</script>

<button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700 focus:outline-none" on:click="{logout}">
  logout Button
</button>
