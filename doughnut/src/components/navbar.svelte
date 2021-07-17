<script lang="ts">
  import {
    Navbar,
    NavbarBrand,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap'
</script>

<div>
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">👑 krenolc</NavbarBrand>
    <ButtonDropdown>
      <DropdownToggle color="dark" caret>(hirzi-bot)</DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Available Bots</DropdownItem>
        <DropdownItem>hirzi-bot</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  </Navbar>
</div>
