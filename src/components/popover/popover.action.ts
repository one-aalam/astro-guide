import { get, type Readable } from "svelte/store";

type Config = {
    // Whether the listener is active.
    enabled?: boolean | Readable<boolean>;
    // Callback when user clicks outside a given element.
    handler?: (evt: PointerEvent) => void;
    // A predicate function or a list of elements that should not trigger the event.
    ignore?: ((e: PointerEvent) => boolean) | Element[];
}

export const popoverBindings = (node: HTMLElement, config: Config = {}) => {
    let options = { enabled: true, ...config };

    function isEnabled(): boolean {
        return typeof options.enabled === 'boolean' ? options.enabled : get(options.enabled);
    }
    
    const handleOutsideClick = (e) => {
        if (options.ignore) {
            if (Array.isArray(options.ignore) && options.ignore.includes(e.target as Element)) {
                return;
            } else if (typeof options.ignore === 'function' && options.ignore(e.target)) {
                return;
            }
        }
        if (!node.contains(e.target)) {
            node.dispatchEvent(new CustomEvent('out', {
                detail: {}
            }));
        }
    };

    const handleKeydown = (e) => {
        if (options.ignore) {
            if (Array.isArray(options.ignore) && options.ignore.includes(e.target as Element)) {
                return;
            } else if (typeof options.ignore === 'function' && options.ignore(e.target)) {
                return;
            }
        }
        e.stopPropagation()
        if (e.key === 'Escape') {
            node.dispatchEvent(new CustomEvent('esc', {
                detail: {}
            }));
        }
    }

    document.addEventListener('pointerdown', handleOutsideClick)
    node.addEventListener('keydown', handleKeydown)
    return {
        destroy: () => {
            document.removeEventListener('pointerdown', handleOutsideClick)
            node.removeEventListener('keydown', handleKeydown)
        }
    }
}
