export function useDocumentScroll() {
    const app = useNuxtApp();
    const y = useState<number>("document-scroll-y", () => 0);
    const progress = useState<number>("document-scroll-progress", () => 0);
    const introEnd = useState<number>("document-scroll-intro-end", () => 0);
    function moveTo(target: number | string | HTMLElement, immediate = false) {
        app.$scroll?.moveTo(target, immediate);
    }
    return { y: readonly(y), progress: readonly(progress), introEnd: readonly(introEnd), moveTo };
}
