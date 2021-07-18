<script lang="ts">

  import {
    Navbar,
    NavbarBrand,
    DropdownItem
  } from 'sveltestrap/src'

  import { bots as botsStore } from '../stores/common'
</script>

<div>
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">👑 krenolc</NavbarBrand>
    <div class="dropdown">
      <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuBot" data-bs-toggle="dropdown" aria-expanded="false">
        (hirzi-bot)
      </button>
      <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuBot">
        <DropdownItem header>Available Bots</DropdownItem>
        {#each $botsStore as botName}
          <DropdownItem>{ botName }</DropdownItem>
        {/each}
      </ul>
    </div>
  </Navbar>
</div>
