import { createAnimatable } from "animejs";
import type { Ref } from "vue";
import { cursorGeometry } from "#shared/utils/preview";

export function useCursorMotion(element: Ref<HTMLElement | null>) {
    const { point, target } = usePointerTracker();
    let animation: ReturnType<typeof createAnimatable> | undefined;

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
