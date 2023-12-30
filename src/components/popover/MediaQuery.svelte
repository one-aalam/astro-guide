<script lang="ts">
    import { onMount } from "svelte";
    import { readable, derived, type Readable } from "svelte/store";

    export let query;

    const defaultQueries = {
        '2xl': 'screen and (min-width: 1536px)',
        xl: 'screen and (min-width: 1280px)',
        lg: 'screen and (min-width: 1024px)',
        md: 'screen and (min-width: 768px)',
        sm: 'screen and (min-width: 640px)'
    }

    let mql;
    let mqlListener;
    let wasMounted = false;
    let matches = false;
    let mqStore: Readable<{}>;


    const makeMQMatcherInstance = (queries: Record<keyof typeof defaultQueries, string>) => {
        const qs: Partial<Record<keyof typeof defaultQueries, Readable<boolean>>> = Object.entries(queries).reduce((
            acc, [mediaName, queryString]
        ) => (acc[mediaName] = readable(false, addNewListener(queryString)), acc), {})
        return derived(Object.values(qs), ($queryStores) => $queryStores.reduce((acc, q, i) => (acc[Object.keys(qs)[i]] = q, acc), {}))
    }

    onMount(() => {
        wasMounted = true;
        return () => {
            removeActiveListener();
        };
    });

    $: {
        if (wasMounted) {
            removeActiveListener();
            addNewListener(query);
            // mqStore = makeMQMatcherInstance(defaultQueries);
        }
    }

    function addNewListener(query: string) {
        mql = window.matchMedia(query);
        mqlListener = v => matches = v.matches;
        mql.addEventListener('change', mqlListener);
        matches = mql.matches;
        return () => mql && mqlListener && mql.removeEventListener('change', mqlListener)
    }

    function removeActiveListener() {
        if (mql && mqlListener) {
            mql.removeEventListener('change', mqlListener);
        }
    }
</script>

<slot {matches} {mqStore} />
