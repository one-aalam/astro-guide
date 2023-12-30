import { writable } from 'svelte/store'

export let isSidebarVisible = writable<boolean>(true)

export const toggleSidebarVisibility = () => {
    isSidebarVisible.update(value => !value)
}

export const hideSidebar = () => {
    if (isSidebarVisible) {
        isSidebarVisible.set(false)
    }
}

export const showSidebar = () => {
    isSidebarVisible.update(_ => true)
}