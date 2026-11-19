import type { ScrollMoveOptions, ScrollTarget } from "~/types/scroll";

export function useDocumentScroll() {
    const app = useNuxtApp();
    const { y, progress, introEnd } = useScrollState();
    function moveTo(target: ScrollTarget, options: ScrollMoveOptions = {}) {
        app.$scroll?.moveTo(target, options);
    }
    return { y: readonly(y), progress: readonly(progress), introEnd: readonly(introEnd), moveTo };
}
