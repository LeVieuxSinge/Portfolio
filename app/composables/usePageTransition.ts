/**
 * Expose navigation-derived flags without giving presentation components phase-writing authority.
 * @returns Read-only phase, isNavigating, and pageCovered; menu phases do not mount a second page cover.
 */
export function usePageTransition() {
    const phase = useNavigationState();

    const isNavigating = computed(() => phase.value !== "idle");
    const pageCovered = computed(() => phase.value.startsWith("page-"));

    return { phase: readonly(phase), isNavigating, pageCovered };
}
