<script lang="ts">
    import { fly } from 'svelte/transition'
    import { isSidebarVisible, hideSidebar } from '../../store/sidebar';
    import { MEDIA_QUERY } from 'src/constants';
    import { popoverBindings } from './popover.action'
    import MediaQuery from './MediaQuery.svelte';
</script>
<MediaQuery query={MEDIA_QUERY.lg} let:matches>
    {#if matches || $isSidebarVisible}
        <aside 
            class="sidebar sidebar--static@md js-sidebar" 
            tabindex="-1" 
            use:popoverBindings 
            on:esc={hideSidebar}
            transition:fly={{x: -100}}
        >
            <div class="sidebar__panel">
                <header class="sidebar__header">
                    <h3 class="meta sidebar__title" id="sidebar-title">
                        <slot name="title"/>
                    </h3>
                    <button
                        class="sidebar__close-btn text-gray-300 dark:text-gray-600"
                        on:click={hideSidebar}
                    >
                        <slot name="trigger"/>
                    </button>
                </header>
                <br/>
                <div class="relative z-[1]">
                    <slot/>
                </div>
            </div>
        </aside>
    {/if}
</MediaQuery>
<style lang="postcss">
    .sidebar {
        @apply lg:flex flex-col gap-6 pr-6 py-10;
        @apply text-left top-16 min-h-full self-start;
        @apply fixed lg:sticky;
        @apply w-8/12 sm:w-6/12 md:w-5/12 lg:w-3/12;
        @apply bg-gradient-to-r from-gray-300 to-zinc-100 dark:from-zinc-700  dark:to-gray-800 lg:bg-inherit lg:bg-none;
        @apply shadow-2xl lg:shadow-none;
        @apply h-screen overflow-y-auto lg:h-auto lg:overflow-visible mt-8 rounded-tr-lg transition-all;
    }
    .sidebar__panel {
        @apply flex flex-col px-3 py-2;
    }
    .sidebar__desc {
        @apply text-base leading-6 text-gray-50;
    }
    .meta {
        @apply text-sm font-semibold uppercase text-dark-primary;
    }
    .sidebar__header {
        @apply flex lg:hidden z-[2] uppercase truncate;
    }
    .sidebar__title {
        @apply text-lg text-gray-600 dark:text-gray-300 hover:underline flex-1 pl-4 truncate;
    }
</style>
