import { animate, stagger } from "animejs";
import type { Ref } from "vue";

export function useMenuMotion(panel: Ref<HTMLElement | null>) {
    const reduced = usePreferredReducedMotion();
    const effects: ReturnType<typeof animate>[] = [];
    const pending = new Set<() => void>();
    let generation = 0;
    function stop() {
        generation++;
        effects.forEach(effect => effect.cancel());
        pending.forEach(resolve => resolve());
        pending.clear();
    }
    function run(target: Parameters<typeof animate>[0], options: Parameters<typeof animate>[1]) {
        return new Promise<void>((resolve) => {
            pending.add(resolve);
            effects.push(animate(target, { ...options, onComplete: () => {
                pending.delete(resolve);
                resolve();
            } }));
        });
    }
    function restore() {
        effects.splice(0).forEach(effect => effect.revert());
    }
    function settle() {
        stop();
        restore();
        const background = panel.value?.querySelector<HTMLElement>("[data-menu-background]");
        if (background) background.style.opacity = "1";
    }
    async function enter() {
        stop();
        const token = generation;
        if (!panel.value || reduced.value === "reduce") return settle();
        const jobs = [run(panel.value.querySelector("[data-menu-background]")!, { opacity: [0, 1], duration: 360, ease: "out(3)" })];
        jobs.push(run(panel.value.querySelectorAll("[data-menu-row]"), { opacity: [0, 1], y: [-24, 0], delay: stagger(65, { start: 80 }), duration: 520, ease: "out(4)" }));
        await Promise.all(jobs);
        if (token === generation) settle();
    }
    async function exit(fadeBackground: boolean) {
        stop();
        if (!panel.value || reduced.value === "reduce") return;
        const jobs = [run(panel.value.querySelectorAll("[data-menu-row]"), { opacity: 0, y: -24, delay: stagger(45, { from: "last" }), duration: 280, ease: "in(3)" })];
        jobs.push(run(panel.value.querySelector("[data-menu-background]")!, { opacity: fadeBackground ? 0 : 1, duration: 500, ease: "inOut(3)" }));
        await Promise.all(jobs);
    }
    async function revealPage() {
        if (panel.value && reduced.value !== "reduce") await run(panel.value.querySelector("[data-menu-background]")!, { opacity: 0, duration: 400, ease: "inOut(3)" });
    }
    onBeforeUnmount(() => {
        stop();
        restore();
    });
    return { enter, exit, revealPage, settle, restore };
}
