import type { Ref } from "vue";
import { createAnimationScope } from "~/utils/motion/scope";
import { motionDurations } from "~/utils/motion/tokens";

/**
 * Continue the server-rendered first-paint CSS counter after hydration instead of restarting its two-second timer.
 * @param number Counter element whose CSS animation exposes elapsed milliseconds.
 * @param ready Essential readiness; incomplete work caps the displayed percentage at 99.
 * @param onStart Message-history catch-up callback receiving elapsed milliseconds.
 * @returns Progress from 0–100, CSS ownership, and elapsed status; unmount cancels the owned effect.
 */
export function useEntryProgress(number: Ref<HTMLElement | null>, ready: Readonly<Ref<boolean>>, onStart: (sincePaint: number) => void) {
    const progress = shallowRef(0);
    const owned = shallowRef(false);
    const elapsed = shallowRef(false);

    const effects = createAnimationScope();

    const counter = { value: 0 };

    onMounted(async () => {
        // CSS has already progressed since first paint; take over its elapsed time and visible integer atomically.
        const initial = number.value?.getAnimations().find(animation => (animation as CSSAnimation).animationName === "entry-progress-start");
        const sincePaint = Math.min(motionDurations.entryProgress, Number(initial?.currentTime) || 0);
        const visible = Number.parseInt(number.value ? getComputedStyle(number.value).getPropertyValue("--entry-count") : "0") || 0;

        counter.value = visible;
        progress.value = visible;
        owned.value = true;
        onStart(sincePaint);

        const finished = await effects.run(counter, {
            value: [visible, 100], duration: Math.max(1, motionDurations.entryProgress - sincePaint), ease: "linear",
            onUpdate: () => { progress.value = Math.min(ready.value ? 100 : 99, Math.floor(counter.value)); },
        });

        if (finished) elapsed.value = true;
    });
    onBeforeUnmount(effects.revert);

    return { progress, owned: readonly(owned), elapsed: readonly(elapsed) };
}
