
<script lang="ts">
import {
  Icon,
  Tooltip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle
} from 'sveltestrap/src'
</script>

<div class="d-flex flex-column flex-shrink-0" style="width: 4.5em; height: 100vh; overflow-y: auto; box-shadow: 0 0.125em 0.5em rgb(0 0 0 / 15%);">
  <a href="/#" id="sidebar-app" class="bg-dark bg-gradient text-light text-center p-3 link-dark text-decoration-none">
    <Icon class="h3" name="controller" />
  </a>
  <Tooltip target="sidebar-app" placement="right">Krenolc Dashboard</Tooltip>
  <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
    <li>
      <a href="/#" id="sidebar-dashboard" class="nav-link active py-3 border-bottom">
        <Icon class="h4" name="speedometer2" />
      </a>
      <Tooltip target="sidebar-dashboard" placement="right">Dashboard</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-editor" class="nav-link py-3 border-bottom">
        <Icon class="h4" name="pencil-square" />
      </a>
      <Tooltip target="sidebar-editor" placement="right">Editor</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-faq" class="nav-link py-3 border-bottom">
        <Icon class="h4" name="question-circle" />
      </a>
      <Tooltip target="sidebar-faq" placement="right">FAQ</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-livechat" class="nav-link py-3 border-bottom">
        <Icon class="h4" name="chat-square-dots" />
      </a>
      <Tooltip target="sidebar-livechat" placement="right">Live Chat</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-widget" class="nav-link py-3 border-bottom">
        <Icon class="h4" name="tv" />
      </a>
      <Tooltip target="sidebar-widget" placement="right">Widget</Tooltip>
    </li>
    <li>
      <a href="/#" id="sidebar-settings" class="nav-link py-3 border-bottom">
        <Icon class="h4" name="sliders" />
      </a>
      <Tooltip target="sidebar-settings" placement="right">Settings</Tooltip>
    </li>
  </ul>
  <Dropdown class="border-top" direction="right" style="position: unset;">
    <DropdownToggle tag="div">
      <a href="/#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none">
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
      <DropdownItem>
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