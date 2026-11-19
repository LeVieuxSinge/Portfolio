import { stagger } from "animejs";
import type { Ref } from "vue";
import { createAnimationScope } from "~/utils/motion/scope";
import { motionDurations } from "~/utils/motion/tokens";

/**
 * Own whole-row menu choreography and its background, independently of the persistent header.
 * @param panel Mounted menu panel containing data-menu-row/background targets.
 * @returns Interruptible enter/exit/reveal/hold operations and style restoration; unmount cancels all waiters.
 */
export function useMenuMotion(panel: Ref<HTMLElement | null>) {
    const reduced = usePreferredReducedMotion();

    const effects = createAnimationScope();

    let generation = 0;

    /**
     * Invalidate the previous choreography and settle its animation waiters without immediately restoring current styles.
     */
    function stop() {
        generation++;
        effects.cancel();
    }

    /**
     * Restore original row/background styles and release retained effect handles.
     */
    function restore() {
        effects.revert();
    }

    /**
     * Finish a static open-menu state, including when locale or reduced-motion policy changes.
     */
    function settle() {
        stop();
        restore();

        const background = panel.value?.querySelector<HTMLElement>("[data-menu-background]");

        if (background)
            background.style.opacity = "1";
    }

    /**
     * Fade the background and reveal complete rows downward with stagger; cancellation cannot later overwrite a newer phase.
     */
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

    /**
     * Hide complete rows upward in reverse order while either fading or retaining the opaque background.
     * @param fadeBackground False keeps the destination covered during menu navigation.
     */
    async function exit(fadeBackground: boolean) {
        stop();
        if (!panel.value || reduced.value === "reduce")
            return;
        await Promise.all([
            effects.run(panel.value.querySelectorAll("[data-menu-row]"), { opacity: 0, y: -24, delay: stagger(45, { from: "last" }), duration: motionDurations.menuRowsExit, ease: "in(3)" }),
            effects.run(panel.value.querySelector("[data-menu-background]")!, { opacity: fadeBackground ? 0 : 1, duration: motionDurations.overlayExit, ease: "inOut(3)" }),
        ]);
    }

    /**
     * Fade only the opaque menu background after destination preparation; rows have already exited.
     */
    async function revealPage() {
        if (panel.value && reduced.value !== "reduce")
            await effects.run(panel.value.querySelector("[data-menu-background]")!, { opacity: 0, duration: motionDurations.pageReveal, ease: "inOut(3)" });
    }

    /**
     * Immediately restore an opaque handoff and hidden rows when another navigation interrupts the intended destination.
     */
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
