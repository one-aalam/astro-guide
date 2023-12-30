<script>
    import ModalStack from './ModalStack.svelte'
    import { closeModal } from './modal.store'
  </script>

<ModalStack>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div slot="backdrop" class="modal__backdrop" on:click={closeModal} />
</ModalStack>

<style lang="postcss">
    .modal__backdrop {
        /* background: rgba(0,0,0,0.50); */
        @apply fixed top-0 bottom-0 right-0 opacity-50 bg-gray-500;
    }
</style>
