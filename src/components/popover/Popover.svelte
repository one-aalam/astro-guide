
<script context="module" lang="ts">
    export type PopoverDir = 'left' | 'right';
</script>
<script lang="ts">
    import { scale } from 'svelte/transition'
    import { popoverBindings } from './popover.action'

    export let dir: PopoverDir = 'right'
    let show = false
    const toggleVisibility = () => {
        show = !show
    }
</script>
<div class="popover" tabindex="-1" use:popoverBindings on:out={() => { if(show) show = false }} on:esc={toggleVisibility}>
    <button on:click={toggleVisibility}>
        <slot name="trigger"/>
    </button>
    {#if show}
        <div class="popover__content" role="dialog" on:mouseout={toggleVisibility} on:blur={toggleVisibility} class:popover__content--left={dir === 'left'} class:popover__content--right={dir === 'right'}

            in:scale={{ duration: 75, start: 0.95 }} out:scale={{ duration: 75, start: 0.95 }}
        >
            <slot/>
        </div>
    {/if}
</div>

<style>
    @reference "tailwindcss";

    .popover {
        @apply relative
    }
    .popover__content {
       @apply absolute z-20
    }
    .popover__content--right {
        @apply right-0 origin-top-right
    }
    .popover__content--left {
        @apply left-0 origin-top-left
    }
</style>
