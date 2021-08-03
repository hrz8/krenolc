<script lang="ts">
  import { Rest } from '$lib/rest'

  import {
    Navbar,
    NavbarBrand,
    DropdownItem
  } from 'sveltestrap/src'

  import {
    allBots as botsStore, Bot, usedBot as botStore
  } from '../../stores/bot'

  export let token = ''

  const switchBot = async (botName: string): Promise<void> => {
    console.log(botName)
    const result = await Rest.invoke<any>('auth.switchBot', {
      token,
      params: botName
    })
    // await Bot.load({
    //   bots   : user.bots,
    //   default: user.defaultBot
    // })
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">👑</NavbarBrand>
  <div class="dropdown">
    <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuBot" data-bs-toggle="dropdown" aria-expanded="false">
      ({$botStore.name})
    </button>
    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuBot">
      <DropdownItem header>Available Bots</DropdownItem>
      {#each $botsStore as botName}
        <li>
          <button
            disabled="{botName === $botStore.name}"
            class="dropdown-item {botName === $botStore.name ? 'active' : ''}"
            on:click={async () => {await switchBot(botName)}}
          >{ botName }</button>
        </li>
      {/each}
    </ul>
  </div>
</Navbar>
