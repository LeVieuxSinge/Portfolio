export function useSafeAnimations(cb: () => (() => void) | undefined) {
    const { isLoading, isPageTransitioning } = useLoading();

    let revertCb: (() => void) | undefined = undefined;

    const canStart = computed(() => !isLoading.value && !isPageTransitioning.value);
    watch(canStart, (newVal) => {
        if (newVal) {
            revertCb = cb();
        }
    }, { immediate: true }); // Run the callback immediately if conditions are already met on setup

    onUnmounted(() => {
        if (revertCb) {
            revertCb();
            revertCb = undefined;
        }
    });
}
