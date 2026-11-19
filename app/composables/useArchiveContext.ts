import { archiveQuery, normalizeArchiveQuery } from "#shared/utils/catalog";

/**
 * Read Archive browsing context on either a collection or project page without rewriting the URL.
 * @returns Computed normalized state/query and a mounted flag that defers direct-query hydration until server markup has been adopted.
 */
export function useArchiveContext() {
    const route = useRoute();
    const app = useNuxtApp();

    // Static HTML contains the generated default query; adopt it before reading a direct visit’s client URL.
    const queryReady = shallowRef(!app.isHydrating);
    const initial = useState(`archive-hydration:${route.path}`, () => normalizeArchiveQuery(route.query));

    const state = computed(() => queryReady.value ? normalizeArchiveQuery(route.query) : initial.value);
    const query = computed(() => archiveQuery(state.value));

    onMounted(() => {
        queryReady.value = true;
    });

    return { state, query, queryReady: readonly(queryReady) };
}
