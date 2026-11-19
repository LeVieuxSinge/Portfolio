import { stagger } from "animejs";
import type { Ref } from "vue";
import { createAnimationScope } from "~/utils/motion/scope";
import { motionDurations } from "~/utils/motion/tokens";

export function useMenuMotion(panel: Ref<HTMLElement | null>) {
    const reduced = usePreferredReducedMotion();
    const effects = createAnimationScope();
    let generation = 0;
    function stop() {
        generation++;
        effects.cancel();
    }
    function restore() {
        effects.revert();
    }
    function settle() {
        stop();
        restore();
        const background = panel.value?.querySelector<HTMLElement>("[data-menu-background]");
        if (background)
            background.style.opacity = "1";
    }
    async function enter() {
        stop();
        const token = generation;
        if (!panel.value || reduced.value === "reduce")
            return settle();
        await Promise.all([
            effects.run(panel.value.querySelector("[data-menu-background]")!, { opacity: [0, 1], duration: motionDurations.menuBackground, ease: "out(3)" }),
            effects.run(panel.value.querySelectorAll("[data-menu-row]"), { opacity: [0, 1], y: [-24, 0], delay: stagger(65, { start: 80 }), duration: motionDurations.menuRows, ease: "out(4)" }),
        ]);
        if (token === generation)
            settle();
    }
    async function exit(fadeBackground: boolean) {
        stop();
        if (!panel.value || reduced.value === "reduce")
            return;
        await Promise.all([
            effects.run(panel.value.querySelectorAll("[data-menu-row]"), { opacity: 0, y: -24, delay: stagger(45, { from: "last" }), duration: motionDurations.menuRowsExit, ease: "in(3)" }),
            effects.run(panel.value.querySelector("[data-menu-background]")!, { opacity: fadeBackground ? 0 : 1, duration: motionDurations.overlayExit, ease: "inOut(3)" }),
        ]);
    }
    async function revealPage() {
        if (panel.value && reduced.value !== "reduce")
            await effects.run(panel.value.querySelector("[data-menu-background]")!, { opacity: 0, duration: motionDurations.pageReveal, ease: "inOut(3)" });
    }
    function hold() {
        stop();
        const background = panel.value?.querySelector<HTMLElement>("[data-menu-background]");
        if (background) background.style.opacity = "1";
        panel.value?.querySelectorAll<HTMLElement>("[data-menu-row]").forEach((row) => {
            row.style.opacity = "0";
        });
    }
    watch(reduced, (value) => {
        if (value === "reduce")
            settle();
    });
    onBeforeUnmount(() => {
        stop();
        restore();
    });
    return { enter, exit, revealPage, hold, settle, restore };
}
