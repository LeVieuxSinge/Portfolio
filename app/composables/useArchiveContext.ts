import { archiveQuery, normalizeArchiveQuery } from "#shared/utils/catalog";
/** Read browsing context without normalizing or mutating a project's URL. */
export function useArchiveContext() {
    const route = useRoute();
    const app = useNuxtApp();
    const queryReady = shallowRef(!app.isHydrating);
    const initial = useState(`archive-hydration:${route.path}`, () => normalizeArchiveQuery(route.query));
    const state = computed(() => queryReady.value ? normalizeArchiveQuery(route.query) : initial.value);
    const query = computed(() => archiveQuery(state.value));
    onMounted(() => {
        queryReady.value = true;
    });
    return { state, query, queryReady: readonly(queryReady) };
}
