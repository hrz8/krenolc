<script lang="ts">
    import { Styles } from 'sveltestrap';
    import { Button } from 'sveltestrap/src'
    import type { ButtonColor } from 'sveltestrap/src/Button'

    import Sidebar from '../components/sidebar.svelte'

    const colors: ButtonColor[] = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
    ]
</script>

<Styles />

<div class="container-fluid">
    <div class="row">
        <div class="col-sm-auto p-0 bg-light" style="height: 100vh; overflow-y: auto;">
            <Sidebar />
        </div>
        <div class="content col-sm p-3 min-vh-100">
            <slot></slot>
        </div>
    </div>
</div>

<style>
    .content {
        flex-shrink: 0;
        border: solid rgba(0, 0, 0, .15);
        border-width: 1px 0;
        box-shadow: inset 0 0.5em 1.5em rgb(0 0 0 / 10%), inset 0 0.125em 0.5em rgb(0 0 0 / 15%);
    }
</style>