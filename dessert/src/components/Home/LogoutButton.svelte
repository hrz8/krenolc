<script lang="ts">
  import Button from '@smui/button'
  import Label from '@smui/common'
  import AuthFactory from '@services/auth'

  function logout() {
    AuthFactory.logout()
  }
</script>

<!-- <button class="px-4 py-1 text-white bg-yellow-500 rounded-full font-semibold hover:bg-yellow-700 focus:outline-none" on:click="{logout}">
  logout Button
</button> -->

<Button
  variant="outlined"
  class="button-shaped-round"
>
  <Label>Outlined</Label>
</Button>
