export function usePageTransition() {
    const phase = useNavigationState();
    const isNavigating = computed(() => phase.value !== "idle");
    const pageCovered = computed(() => phase.value.startsWith("page-"));
    return { phase: readonly(phase), isNavigating, pageCovered };
}
