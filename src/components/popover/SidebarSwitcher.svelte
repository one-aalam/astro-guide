<script lang="ts">
    import { isSidebarVisible, hideSidebar, showSidebar } from '../../store/sidebar'
</script>
{#if $isSidebarVisible}
    <button class="sidebar-trigger lg:hidden" on:click={hideSidebar} aria-controls="sidebar">
        <slot name="hide"/>
    </button>
{:else}
    <button class="sidebar-trigger lg:hidden" on:click={showSidebar} aria-controls="sidebar">
        <slot name="show"/>
    </button>
{/if}
