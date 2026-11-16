import Lenis from "lenis";
import "lenis/dist/lenis.css";

export default defineNuxtPlugin((app) => {
    const y = useState<number>("document-scroll-y", () => 0);
    const progress = useState<number>("document-scroll-progress", () => 0);
    const { isOpen } = useMenu();
    const { isLoading } = useLoading();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let requested = false;

    function updateProgress() {
        y.value = Math.max(0, window.scrollY);
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        progress.value = limit > 0 ? Math.max(0, Math.min(100, y.value / limit * 100)) : 0;
    }
    function cancelRequestedMove() {
        if (requested) lenis?.scrollTo(window.scrollY, { immediate: true });
        requested = false;
    }
    function moveTo(target: number | string | HTMLElement, immediate = false) {
        const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target;
        const offset = element ? -(Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) : 0;
        if (lenis) {
            requested = !immediate;
            lenis.scrollTo(element || target, {
                immediate,
                offset,
                duration: 0.65,
                easing: t => 1 - (1 - t) ** 3,
                onComplete: () => { requested = false; },
            });
        }
        else {
            const top = typeof target === "number" ? target : element ? element.getBoundingClientRect().top + window.scrollY + offset : 0;
            window.scrollTo({ top, behavior: "instant" });
        }
        updateProgress();
    }
    function suspend() {
        if (isOpen.value || isLoading.value || document.hidden) {
            cancelRequestedMove();
            lenis?.stop();
        }
        else lenis?.start();
    }
    function initialize() {
        lenis?.destroy();
        lenis = undefined;
        if (!reduced.matches) {
            const ios = /(?:iPhone|iPad|iPod).*OS (\d+)_/.exec(navigator.userAgent);
            lenis = new Lenis({
                autoRaf: true,
                smoothWheel: true,
                syncTouch: !ios || Number(ios[1]) >= 16,
                lerp: 0.1,
                syncTouchLerp: 0.075,
                touchInertiaExponent: 1.7,
                wheelMultiplier: 1,
                touchMultiplier: 1,
                anchors: false,
                stopInertiaOnNavigate: true,
                prevent: node => !!node.closest("select, textarea, input, [contenteditable='true'], [data-lenis-prevent]"),
                virtualScroll: ({ event }) => !event.ctrlKey && !event.metaKey,
            });
            suspend();
        }
        updateProgress();
    }
    function onKeydown(event: KeyboardEvent) {
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) cancelRequestedMove();
    }
    function onAnchor(event: MouseEvent) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
        if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
        const url = new URL(anchor.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
        let element: HTMLElement | null;
        try {
            element = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        }
        catch {
            return;
        }
        if (!element) return;
        event.preventDefault();
        if (url.hash === location.hash) moveTo(element);
        else void app.$router.push({ hash: url.hash });
        if (!element.hasAttribute("tabindex")) element.setAttribute("tabindex", "-1");
        element.focus({ preventScroll: true });
    }

    const stopWatch = watch([isOpen, isLoading], suspend);
    const stopBefore = app.$router.beforeEach(() => {
        cancelRequestedMove();
    });
    const stopReveal = app.hook("page:loading:end", () => {
        lenis?.resize();
        updateProgress();
    });
    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(document.documentElement);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    window.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onAnchor);
    document.addEventListener("visibilitychange", suspend);
    reduced.addEventListener("change", initialize);
    app.hook("app:mounted", initialize);

    function dispose() {
        lenis?.destroy();
        resizeObserver.disconnect();
        stopWatch();
        stopBefore();
        stopReveal();
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
        window.removeEventListener("keydown", onKeydown);
        document.removeEventListener("click", onAnchor);
        document.removeEventListener("visibilitychange", suspend);
        reduced.removeEventListener("change", initialize);
    }
    if (import.meta.hot) import.meta.hot.dispose(dispose);
    return { provide: { scroll: { moveTo, cancelRequestedMove } } };
});
