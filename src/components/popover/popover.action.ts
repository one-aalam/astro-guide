export const popoverBindings = (node: HTMLElement) => {
    const handleOutsideClick = (e) => {
        const ignorable = e.target && e.target.classList.contains('sidebar-trigger') || e.target.parentNode && e.target.parentNode.classList.contains('sidebar-trigger');
        if (!node.contains(e.target) && !ignorable) {
            node.dispatchEvent(new CustomEvent('out', {
                detail: {}
            }));
        }
    };

    const handleKeydown = (e: KeyboardEvent) => {
        e.stopPropagation()
        if (e.key === 'Escape') {
            node.dispatchEvent(new CustomEvent('esc', {
                detail: {}
            }));
        }
    }

    window.addEventListener('click', handleOutsideClick)
    node.addEventListener('keydown', handleKeydown)
    return {
        destroy: () => {
            window.removeEventListener('click', handleOutsideClick)
            node.removeEventListener('keydown', handleKeydown)
        }
    }
}
