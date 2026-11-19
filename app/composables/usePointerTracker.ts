import { motionDurations } from "~/utils/motion/tokens";

/**
 * Share one lifecycle-managed mouse tracker across cursor, icon, and previews.
 * VueUse creates an isolated instance during SSR and a subscriber-owned scope on the client.
 * @returns Read-only viewport point/target refs; null hides mouse-only decoration.
 */
export const usePointerTracker = createSharedComposable(() => {
    const point = shallowRef<{ x: number; y: number } | null>(null);
    const target = shallowRef<Element | null>(null);
    /** RAF/performance timestamp in milliseconds until reveal/layout hit-testing can stop. */
    let settlingUntil = 0;

    /**
     * Hit-test the last mouse position against current geometry, including rows moved by scrolling/reveal transforms.
     */
    function refreshTarget() {
        target.value = point.value ? document.elementFromPoint(point.value.x, point.value.y) : null;
    }

    // Reveal/layout transforms can keep moving a row after the final scroll event.
    const { pause, resume } = useRafFn(({ timestamp }) => {
        refreshTarget();
        if (!point.value || timestamp >= settlingUntil) pause();
    }, { immediate: false });

    /**
     * Resample through the reveal-settling window after native scrolling stops, so a stationary pointer cannot retain the previous row.
     */
    function trackScroll() {
        refreshTarget();
        if (!point.value) return;
        settlingUntil = performance.now() + motionDurations.reveal + 100;
        resume();
    }

    /**
     * Track mouse viewport coordinates/targets; a touch or pen event clears mouse-only decoration.
     */
    function update(event: PointerEvent) {
        point.value = event.pointerType === "mouse" ? { x: event.clientX, y: event.clientY } : null;
        target.value = point.value && event.target instanceof Element ? event.target : null;
    }

    useEventListener("pointermove", update, { passive: true });
    useEventListener("pointerdown", update, { passive: true });
    useEventListener("pointerout", (event: PointerEvent) => {
        if (!event.relatedTarget) {
            pause();
            point.value = null;
            target.value = null;
        }
    });
    useEventListener("scroll", trackScroll, { passive: true });

    return { point: readonly(point), target: readonly(target) };
});
