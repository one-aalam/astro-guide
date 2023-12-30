import { beforeUpdate } from 'svelte'
/*
* Example
    import { resize } from '../../store/resize-observer';
    import { writable } from 'svelte/store'
	let scrollWidth = writable();
    
    use:resize={[scrollWidth, el => el.scrollWidth]}
*/

export function resize(el, [store, updater]) {
    let dirty;
    beforeUpdate(() => {
        if (dirty) store.set(updater(el))
        dirty = false;
    })

    if (ResizeObserver) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                dirty = true;
                //force before update to run;
                store.set(null)
            }
        });

        resizeObserver.observe(el);

        return {
            destroy() { resizeObserver.unobserve(el); }
        }
    }
}
