import type { previewFrame } from "#shared/utils/preview";

/**
 * Own frame-rate-independent pursuit and damped tilt, with geometry/visibility supplied by the preview owner.
 * @returns Read-only CSS-pixel position plus place/stop; the scoped RAF pauses after settling or unmount.
 */
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

    /**
     * Pause pursuit and discard angular velocity without changing the retained geometry.
     */
    function stop() {
        pause();
        angularVelocity = 0;
    }

    /**
     * Adopt new geometry immediately for keyboard/reduced-motion previews or pursue it with bounded tilt.
     * @param frame Sized/positioned viewport frame from previewFrame.
     * @param stationary True disables pursuit and rotation for this placement.
     */
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
