import type { Ref } from "vue";
import { createAnimationScope } from "~/utils/motion/scope";
import { motionDurations } from "~/utils/motion/tokens";

export function useLoadingPresentation(elements: { panel: Ref<HTMLElement | null>; number: Ref<HTMLElement | null>; foreground: Ref<HTMLElement | null>; log: Ref<HTMLElement | null> }) {
    const { ready, beginReveal, finish } = useLoading();
    const app = useNuxtApp();
    const reduced = usePreferredReducedMotion();
    const messages = useEntryMessages();
    const { progress, owned, elapsed } = useEntryProgress(elements.number, ready, messages.start);
    const effects = createAnimationScope();
    const logEffects = createAnimationScope();
    let exiting = false;
    let disposed = false;

    watch(messages.history, async () => {
        await nextTick();
        if (disposed || exiting || reduced.value === "reduce" || !elements.log.value) return;
        logEffects.revert();
        void logEffects.run(elements.log.value, { y: [-5, 0], duration: 240, ease: "out(3)" });
    });
    watch([ready, elapsed], async ([isReady, minimumElapsed]) => {
        if (!isReady || !minimumElapsed || exiting) return;
        exiting = true;
        progress.value = 100;
        beginReveal();
        messages.stop();
        await nextTick();
        await app.$pageTransition.preparePage();
        if (disposed) return;
        if (!elements.panel.value) return finish();
        if (elements.foreground.value) void effects.run(elements.foreground.value, {
            opacity: [1, 0], ...(reduced.value !== "reduce" ? { y: [0, -20] } : {}), duration: 320, ease: "in(3)",
        });
        const background = elements.panel.value.querySelector<HTMLElement>("[data-loading-background]")!;
        background.style.animation = "none";
        if (await effects.run(background, { opacity: [1, 0], duration: motionDurations.overlayExit, ease: "inOut(3)" })) finish();
    });
    onBeforeUnmount(() => {
        disposed = true;
        messages.stop();
        logEffects.revert();
        effects.revert();
    });
    return { progress: readonly(progress), owned, history: messages.history };
}
