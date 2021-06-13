
<script lang="ts">
    import { Icon, Tooltip } from 'sveltestrap/src';
</script>

<div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem;">
    <a href="/#" id="sidebar-app" class="text-center p-3 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
        <Icon class="h3" name="controller" />
    </a>
    <Tooltip target="sidebar-app" placement="right">Krenolc Dashboard</Tooltip>
    <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <li>
            <a href="/#" id="sidebar-dashboard" class="nav-link active py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home">
                <Icon class="h4" name="speedometer2" />
            </a>
            <Tooltip target="sidebar-dashboard" placement="right">Dashboard</Tooltip>
        </li>
        <li>
            <a href="/#" id="sidebar-editor" class="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                <Icon class="h4" name="pencil-square" />
            </a>
            <Tooltip target="sidebar-editor" placement="right">Editor</Tooltip>
        </li>
        <li>
            <a href="/#" id="sidebar-faq" class="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                <Icon class="h4" name="question-circle" />
            </a>
            <Tooltip target="sidebar-faq" placement="right">FAQ</Tooltip>
        </li>
        <li>
            <a href="/#" id="sidebar-livechat" class="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                <Icon class="h4" name="chat-square-dots" />
            </a>
            <Tooltip target="sidebar-livechat" placement="right">Live Chat</Tooltip>
        </li>
        <li>
            <a href="/#" id="sidebar-widget" class="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                <Icon class="h4" name="binoculars" />
            </a>
            <Tooltip target="sidebar-widget" placement="right">Widget</Tooltip>
        </li>
        <li>
            <a href="/#" id="sidebar-settings" class="nav-link py-3 border-bottom" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                <Icon class="h4" name="puzzle" />
            </a>
            <Tooltip target="sidebar-settings" placement="right">Settings</Tooltip>
        </li>
    </ul>
    <div class="dropdown border-top">
        <a href="/#" class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none dropdown-toggle" id="dropdownUser3" data-bs-toggle="dropdown" aria-expanded="false">
                <Icon class="h4" name="person-circle" />
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser3">
            <li><a class="dropdown-item" href="/#">New project...</a></li>
            <li><a class="dropdown-item" href="/#">Settings</a></li>
            <li><a class="dropdown-item" href="/#">Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="/#">Sign out</a></li>
        </ul>
    </div>
</div>

<style>
    .nav-flush .nav-link {
        border-radius: 0;
    }
</style>