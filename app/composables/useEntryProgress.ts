import type { Ref } from "vue";
import { createAnimationScope } from "~/utils/motion/scope";
import { motionDurations } from "~/utils/motion/tokens";

/** Continue the first-paint CSS counter instead of restarting a hydration-only timer. */
export function useEntryProgress(number: Ref<HTMLElement | null>, ready: Readonly<Ref<boolean>>, onStart: (sincePaint: number) => void) {
    const progress = shallowRef(0);
    const owned = shallowRef(false);
    const elapsed = shallowRef(false);
    const effects = createAnimationScope();
    const counter = { value: 0 };

    onMounted(async () => {
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
