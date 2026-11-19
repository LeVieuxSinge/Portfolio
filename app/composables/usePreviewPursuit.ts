import type { previewFrame } from "#shared/utils/preview";

/** Frame-rate independent pursuit and damped tilt; positioning/visibility live elsewhere. */
export function usePreviewPursuit() {
    const position = shallowRef({ x: 0, y: 0, rotation: 0, width: 440, maxHeight: 300 });
    let target = { x: 0, y: 0 };
    let angularVelocity = 0;
    const { pause, resume } = useRafFn(({ delta }) => {
        const step = Math.min(delta / 16.667, 2);
        const follow = 1 - 0.88 ** step;
        const current = position.value;
        const dx = target.x - current.x;
        const desiredAngle = Math.max(-12, Math.min(12, dx * 0.11));
        angularVelocity = (angularVelocity + (desiredAngle - current.rotation) * 0.065 * step) * 0.8 ** step;
        position.value = { ...current, x: current.x + dx * follow, y: current.y + (target.y - current.y) * follow, rotation: Math.max(-12, Math.min(12, current.rotation + angularVelocity * step)) };
        if (Math.abs(dx) < 0.1 && Math.abs(target.y - current.y) < 0.1 && Math.abs(current.rotation) < 0.1 && Math.abs(angularVelocity) < 0.05) pause();
    }, { immediate: false });

    function stop() {
        pause();
        angularVelocity = 0;
    }
    function place(frame: ReturnType<typeof previewFrame>, stationary: boolean) {
        const { width, maxHeight, x, y } = frame;
        target = { x, y };
        if (stationary) {
            stop();
            position.value = { ...target, rotation: 0, width, maxHeight };
        }
        else {
            position.value = { ...position.value, width, maxHeight };
            resume();
        }
    }
    onBeforeUnmount(stop);
    return { position: readonly(position), place, stop };
}
