import type { ProfileId, ArchiveSort } from "#shared/types/portfolio";
import { archiveQuery, normalizeArchiveQuery } from "#shared/utils/catalog";

export function useArchiveState() {
    const route = useRoute();
    const router = useRouter();
    const { state, query, queryReady } = useArchiveContext();
    function update(role: ProfileId | "", sort: ArchiveSort) {
        const next = { ...route.query, ...archiveQuery(normalizeArchiveQuery({ role, sort })) };
        if (!role) delete next.role;
        return router.push({ query: next, hash: route.hash });
    }
    watch([queryReady, () => route.fullPath], () => {
        if (import.meta.server || !queryReady.value) return;
        const normalized = query.value;
        if (route.query.role !== normalized.role || (route.query.sort !== undefined && route.query.sort !== normalized.sort)) {
            const next = { ...route.query, ...normalized };
            if (!normalized.role) delete next.role;
            void router.replace({ query: next, hash: route.hash });
        }
    }, { immediate: true });
    return { state, query, update };
}
