
<script lang="ts">
  import { Auth } from '../stores/auth'

  import {
    Icon,
    Tooltip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle
  } from 'sveltestrap/src'

  export let disabled = false
  export let path = '/'

  $: isDisabled = () => disabled ? 'disabled': ''
  $: isActive = (curr, exact = false) => {
    if (exact)
      return curr === path ? 'active' : ''
    return path.startsWith(`/${curr}`) ? 'active' : ''
  }

  const logout = () => {
    Auth.logout()
  }

</script>

<div class="d-flex flex-column flex-shrink-0" style="width: 4.5em; height: 100vh; overflow-y: auto; box-shadow: 0 0.125em 0.5em rgb(0 0 0 / 15%);">
  <a href="." id="sidebar-app" class="bg-dark bg-gradient text-light text-center p-3 link-dark text-decoration-none">
    <Icon class="h3" name="controller" />
  </a>
  <Tooltip target="sidebar-app" placement="right">Krenolc Dashboard</Tooltip>
  <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
    <li>
      <a href="." id="sidebar-dashboard" class="{isActive('/', true)} nav-link py-3 border-bottom {isDisabled()}">
        <Icon class="h4" name="speedometer2" />
      </a>
      <Tooltip target="sidebar-dashboard" placement="right">Dashboard</Tooltip>
    </li>
    <li>
      <a href="editor" id="sidebar-editor" class="{isActive('editor')} nav-link py-3 border-bottom {isDisabled()}">
        <Icon class="h4" name="pencil-square" />
      </a>
      <Tooltip target="sidebar-editor" placement="right">Editor</Tooltip>
    </li>
    <li>
      <a href="faq" id="sidebar-faq" class="{isActive('faq')} nav-link py-3 border-bottom {isDisabled()}">
        <Icon class="h4" name="question-circle" />
      </a>
      <Tooltip target="sidebar-faq" placement="right">FAQ</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-livechat" class="nav-link py-3 border-bottom {isDisabled()}">
        <Icon class="h4" name="chat-square-dots" />
      </a>
      <Tooltip target="sidebar-livechat" placement="right">Live Chat</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-widget" class="nav-link py-3 border-bottom {isDisabled()}">
        <Icon class="h4" name="tv" />
      </a>
      <Tooltip target="sidebar-widget" placement="right">Widget</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-settings" class="nav-link py-3 border-bottom {isDisabled()}">
        <Icon class="h4" name="sliders" />
      </a>
      <Tooltip target="sidebar-settings" placement="right">Settings</Tooltip>
    </li>
  </ul>
  <Dropdown class="border-top" direction="right" style="position: unset;">
    <DropdownToggle tag="div">
      <a href="/" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none">
        <Icon class="h4" name="person-circle" />
      </a>
    </DropdownToggle>
    <DropdownMenu class="text-small shadow">
      <DropdownItem header>Account</DropdownItem>
      <DropdownItem>
        <Icon class="h4" name="person-badge" /> Profile
      </DropdownItem>
      <DropdownItem>
        <Icon class="h4" name="gear" /> Settings
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem on:click={logout}>
        <Icon class="h4" name="box-arrow-right" /> Sign Out
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
</div>

<style>
.nav-flush .nav-link {
  border-radius: 0;
}
</style>