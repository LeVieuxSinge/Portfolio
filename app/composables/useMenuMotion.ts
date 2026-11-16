import { animate, splitText, stagger } from "animejs";
import type { Ref } from "vue";

export function useMenuMotion(panel: Ref<HTMLElement | null>) {
    const reduced = usePreferredReducedMotion();
    const effects: ReturnType<typeof animate>[] = [];
    const splits: ReturnType<typeof splitText>[] = [];
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
        splits.splice(0).forEach(split => split.revert());
    }
    function settle() {
        stop();
        restore();
        const background = panel.value?.querySelector<HTMLElement>("[data-menu-background]");
        if (background) background.style.opacity = "1";
    }
    function text() {
        if (!splits.length) panel.value?.querySelectorAll<HTMLElement>("[data-menu-label]").forEach(label => splits.push(splitText(label, { chars: true, words: false, lines: false, accessible: true })));
        return splits.flatMap(split => split.chars);
    }
    async function enter() {
        stop();
        const token = generation;
        if (!panel.value || reduced.value === "reduce") return settle();
        const jobs = [run(panel.value.querySelector("[data-menu-background]")!, { opacity: [0, 1], duration: 360, ease: "out(3)" })];
        const chars = text();
        jobs.push(run(chars, { opacity: [0, 1], y: ["-75%", "0%"], delay: stagger(14, { start: 100 }), duration: 520, ease: "out(4)" }));
        jobs.push(run(panel.value.querySelectorAll("[data-menu-element]"), { opacity: [0, 1], y: [-20, 0], delay: stagger(45, { start: 100 }), duration: 500, ease: "out(4)" }));
        await Promise.all(jobs);
        if (token === generation) settle();
    }
    async function exit(fadeBackground: boolean) {
        stop();
        if (!panel.value || reduced.value === "reduce") return;
        const jobs = [run(text(), { opacity: 0, y: "-75%", delay: stagger(7, { from: "last" }), duration: 280, ease: "in(3)" })];
        jobs.push(run(panel.value.querySelectorAll("[data-menu-element]"), { opacity: 0, y: -20, delay: stagger(35, { from: "last" }), duration: 260, ease: "in(3)" }));
        jobs.push(run(panel.value.querySelector("[data-menu-background]")!, { opacity: fadeBackground ? 0 : 1, delay: fadeBackground ? 180 : 0, duration: 320, ease: "inOut(3)" }));
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
