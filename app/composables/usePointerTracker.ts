import { motionDurations } from "~/utils/motion/tokens";

/** One lifecycle-managed pointer subscription shared by cursor, icon, and previews. */
export const usePointerTracker = createSharedComposable(() => {
    const point = shallowRef<{ x: number; y: number } | null>(null);
    const target = shallowRef<Element | null>(null);
    let settlingUntil = 0;

    function refreshTarget() {
        target.value = point.value ? document.elementFromPoint(point.value.x, point.value.y) : null;
    }
    // Reveal/layout transforms can keep moving a row after the final scroll event.
    const { pause, resume } = useRafFn(({ timestamp }) => {
        refreshTarget();
        if (!point.value || timestamp >= settlingUntil) pause();
    }, { immediate: false });
    function trackScroll() {
        refreshTarget();
        if (!point.value) return;
        settlingUntil = performance.now() + motionDurations.reveal + 100;
        resume();
    }
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
