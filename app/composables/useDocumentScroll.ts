import type { ScrollMoveOptions, ScrollTarget } from "~/types/scroll";

/**
 * Expose read-only document metrics and movement while the client service retains ownership.
 * @returns y/introEnd in CSS pixels, progress from 0–100, and moveTo; safe to read during SSR.
 */
export function useDocumentScroll() {
    const app = useNuxtApp();
    const { y, progress, introEnd } = useScrollState();

    /**
     * Delegate a caller-requested move when the client scroll owner exists; SSR reads produce no browser side effect.
     */
    function moveTo(target: ScrollTarget, options: ScrollMoveOptions = {}) {
        app.$scroll?.moveTo(target, options);
    }

    return { y: readonly(y), progress: readonly(progress), introEnd: readonly(introEnd), moveTo };
}
