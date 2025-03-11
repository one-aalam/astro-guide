<script lang="ts">
    import { fly } from 'svelte/transition'
    import { isSidebarVisible, hideSidebar } from '../../store/sidebar';
    import { MEDIA_QUERY } from '../../constants';
    import { popoverBindings } from './popover.action'
    import MediaQuery from './MediaQuery.svelte';
    import { onMount } from 'svelte';
    
    // Unique ID for accessibility
    const sidebarId = `sidebar-${Math.random().toString(36).substring(2, 9)}`;
    const headerId = `sidebar-header-${sidebarId}`;
    
    // Trap focus within sidebar when it's shown as a modal
    let sidebarElement: HTMLElement;
    let focusableElements: HTMLElement[] = [];
    let firstFocusableElement: HTMLElement;
    let lastFocusableElement: HTMLElement;
    
    onMount(() => {
        if (sidebarElement) {
            focusableElements = Array.from(
                sidebarElement.querySelectorAll(
                    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
                )
            ) as HTMLElement[];
            
            firstFocusableElement = focusableElements[0];
            lastFocusableElement = focusableElements[focusableElements.length - 1];
            
            // Auto-focus first element when opened as modal
            if (!$isSidebarVisible) {
                firstFocusableElement?.focus();
            }
        }
    });
    
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Tab') {
            // If shift + tab on first element, move to last element
            if (event.shiftKey && document.activeElement === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement?.focus();
            }
            
            // If tab on last element, move to first element
            if (!event.shiftKey && document.activeElement === lastFocusableElement) {
                event.preventDefault();
                firstFocusableElement?.focus();
            }
        }
        
        // Close on Escape key
        if (event.key === 'Escape') {
            hideSidebar();
        }
    }
</script>

<MediaQuery query={MEDIA_QUERY.lg} let:matches>
    {#if matches || $isSidebarVisible}
        <!-- Backdrop for mobile -->
        {#if !matches && $isSidebarVisible}
            <div 
                class="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9] transition-opacity"
                on:click={hideSidebar}
                aria-hidden="true"
                transition:fly={{opacity: 0, duration: 200}}
            ></div>
        {/if}
        
        <aside 
            bind:this={sidebarElement}
            class={[
                'sidebar', 
                matches ? 'sidebar--sticky' : 'sidebar--modal',
                !matches && $isSidebarVisible ? 'sidebar--visible' : ''
            ].join(' ')}
            tabindex="-1" 
            use:popoverBindings 
            on:keydown={handleKeyDown}
            transition:fly={{x: -100, duration: 250}}
            role={$isSidebarVisible && !matches ? 'dialog' : 'complementary'}
            aria-labelledby={headerId}
            id={sidebarId}
        >
            <div class="sidebar__panel">
                <header class="sidebar__header">
                    <h3 class="sidebar__title" id={headerId}>
                        <slot name="title"/>
                    </h3>
                    <button
                        class="sidebar__close-btn"
                        on:click={hideSidebar}
                        aria-label="Close sidebar"
                        title="Close sidebar"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </header>
                
                <nav class="sidebar__nav" aria-label="Sidebar Navigation">
                    <div class="">
                        <slot/>
                    </div>
                </nav>
            </div>
        </aside>
    {/if}
</MediaQuery>

<style>
    @reference "tailwindcss";
    /* Base styles */
    .sidebar {
        --sidebar-width-mobile: 85vw;
        --sidebar-width-sm: 320px;
        --sidebar-width-desktop: 280px;
        --sidebar-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        
        @apply flex flex-col gap-6 pr-6 pb-10 pt-10 lg:pt-0 z-10 left-0;
        @apply text-left top-16 min-h-full self-start;
        @apply bg-gradient-to-r from-gray-300 to-zinc-100 lg:bg-inherit lg:bg-none;
        @apply h-screen overflow-y-auto lg:h-auto lg:overflow-visible mt-8 lg:mt-0 rounded-tr-lg transition-all;
        @apply z-10;
    }

    :global(.dark) .sidebar {
        @apply from-zinc-900 to-zinc-700;
    }
    
    /* Sticky sidebar (desktop) */
    .sidebar--sticky {
        @apply pt-6 pr-4 pb-8 pl-0 sticky top-8 border-0 border-r-2 border-dotted border-gray-200 shadow-none;
        @apply top-16;
        width: var(--sidebar-width-desktop);
        max-height: calc(100vh - 4rem);
    }
    
    :global(.dark) .sidebar--sticky {
        @apply border-gray-600;
    }
    
    /* Modal sidebar (mobile) */
    .sidebar--modal {
        @apply fixed top-0 left-0 h-screen p-4 rounded-tr-lg rounded-br-lg;
        width: var(--sidebar-width-mobile);
        max-width: var(--sidebar-width-sm);
        box-shadow: var(--sidebar-shadow);
    }
    
    .sidebar__panel {
        @apply flex flex-col p-4;
    }
    
    .sidebar__header {
        @apply flex mb-6 lg:hidden z-[2] uppercase truncate;
    }
    
    .sidebar--sticky .sidebar__header {
        display: none;
    }
    
    .sidebar__title {
        @apply text-lg font-semibold text-gray-600 hover:underline flex-1 pl-4 truncate;
    }
    
    :global(.dark) .sidebar__title {
        @apply text-gray-300;
    }
    
    .sidebar__close-btn {
        @apply flex items-center justify-center w-10 h-10 rounded-md text-gray-300 hover:bg-gray-100 hover:text-gray-600 transition-colors;
    }
    
    :global(.dark) .sidebar__close-btn:hover {
        @apply bg-gray-700 text-gray-300;
    }
    
    .sidebar__nav {
        flex: 1;
        overflow-y: auto;
    }
    
    /* Focus outline styles */
    .sidebar__close-btn:focus-visible {
        outline: 2px solid var(--color-primary, #3182ce);
        outline-offset: 2px;
    }
    
    /* Animations */
    .sidebar--visible {
        animation: slide-in 0.25s ease-out forwards;
    }
    
    @keyframes slide-in {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    
    /* Responsive adjustments */
    @media (min-width: 640px) {
        .sidebar--modal {
            max-width: 400px;
        }
    }
</style>