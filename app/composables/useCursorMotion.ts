import { createAnimatable } from "animejs";
import type { Ref } from "vue";
import { cursorGeometry } from "#shared/utils/preview";

/**
 * Animate a component-owned cursor element from the shared pointer tracker.
 * @param element Mounted cursor span; no global ID lookup is used.
 * @returns No public state; the component lifecycle reverts its AnimeJS handle.
 */
export function useCursorMotion(element: Ref<HTMLElement | null>) {
    const { point, target } = usePointerTracker();

    let animation: ReturnType<typeof createAnimatable> | undefined;

    /**
     * Hide an absent pointer or pursue its viewport coordinates, enlarging the cursor over links/buttons.
     */
    function update() {
        if (!animation) return;
        if (!point.value) return void animation.opacity!(0);

        const interactive = !!target.value?.closest("button, a");

        animation.x!(point.value.x);
        animation.y!(point.value.y);
        animation.scale!(interactive ? cursorGeometry.hoverScale : 1);
        animation.opacity!(interactive ? 1 : 0.6);
    }

    watch([point, target], update);

    onMounted(() => {
        if (!element.value) return;
        animation = createAnimatable(element.value, { x: 200, y: 200, scale: 200, opacity: 200, ease: "out(3)" });
        animation.scale!(1);
        animation.opacity!(0);
        update();
    });
    onBeforeUnmount(() => animation?.revert());
}
