import { animate, createLayout, onScroll } from "animejs";
import type { Ref } from "vue";
import type { Project } from "#shared/types/portfolio";
import { motionDurations } from "~/utils/motion/tokens";

/**
 * Give one list ownership of both initial/scroll row reveals and subsequent AnimeJS Layout changes.
 * @param list Mounted ordered list registered as an exclusive reveal scope.
 * @param projects Reactive collection getter; stable slugs identify rows across filters.
 * @param variant Only Archive performs query-driven layout changes.
 * @returns No public state; pending layout generations and observers are invalidated on unmount.
 */
export function useProjectListMotion(list: Ref<HTMLOListElement | null>, projects: () => readonly Project[], variant: "work" | "archive") {
    const app = useNuxtApp();
    const reduced = usePreferredReducedMotion();

    const animations: ReturnType<typeof animate>[] = [];
    const observers: ReturnType<typeof onScroll>[] = [];
    let layout: ReturnType<typeof createLayout> | undefined;
    let unregister = () => {
    };
    let prepared = false;
    /** Monotonic cancellation token: stale nextTick work may never animate a newer list. */
    let version = 0;

    /**
     * Release initial row observers/styles before layout animation takes ownership.
     */
    function clearEntrances() {
        observers.splice(0).forEach(observer => observer.revert());
        animations.splice(0).forEach(animation => animation.revert());
    }

    /**
     * Invalidate pending nextTick work, restore entrance/layout effects, and permit preparation of the next mounted page.
     */
    function reset() {
        version++;
        clearEntrances();
        layout?.revert();
        layout = undefined;
        prepared = false;
    }

    /**
     * Reveal visible rows and observe lower rows once; static locale swaps and reduced motion leave essential rows immediately readable.
     */
    function prepare(staticSwap: boolean) {
        if (prepared)
            return;
        prepared = true;
        if (!list.value || staticSwap || reduced.value === "reduce")
            return;

        let index = 0;

        for (const row of list.value.querySelectorAll<HTMLElement>("[data-layout-row]")) {
            const rect = row.getBoundingClientRect();
            if (rect.bottom < 0)
                continue;
            const visible = rect.top < window.innerHeight - 24;
            const observer = visible ? undefined : onScroll({ target: row, enter: "bottom-=40 top", leave: "top bottom", repeat: false });
            if (observer)
                observers.push(observer);
            animations.push(animate(row, {
                opacity: [0, 1], y: [visible ? 22 : 30, 0], duration: motionDurations.reveal,
                delay: visible ? Math.min(index++ * 45, 270) : 0, ease: "out(4)",
                ...(observer ? { autoplay: observer } : {}),
            }));
        }
    }

    // Capture old geometry before Vue patches the filtered list, then animate the committed layout once.
    watch(projects, async () => {
        if (!prepared || !list.value || variant !== "archive")
            return;

        const token = ++version;

        clearEntrances();
        layout?.revert();
        layout = undefined;
        if (reduced.value === "reduce")
            return;

        const active = createLayout(list.value, {
            children: "[data-layout-row]", duration: motionDurations.listLayout, ease: "out(3)",
            enterFrom: { opacity: 0 }, leaveTo: { opacity: 0 },
        });

        layout = active;
        active.record();
        await nextTick();
        if (token === version)
            active.animate();
    }, { flush: "pre" });

    onMounted(() => {
        if (list.value)
            unregister = app.$reveals.register(list.value, { prepare, reset });
    });
    onBeforeUnmount(() => {
        unregister();
        reset();
    });
}
