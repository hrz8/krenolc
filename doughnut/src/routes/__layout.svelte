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

<main style="display: flex;">
    <Sidebar />
    <div class="container-fluid">
        <div class="row">
        <!-- <div class="col-sm p-3 min-vh-100"></div> -->
            <slot></slot>
        </div>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-wrap: nowrap;
        height: 100vh;
        height: -webkit-fill-available;
        max-height: 100vh;
        overflow-x: auto;
        overflow-y: hidden;
    }
</style>