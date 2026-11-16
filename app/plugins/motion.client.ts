import { animate, onScroll, splitText, stagger } from "animejs";

export default defineNuxtPlugin((app) => {
    const { isLoading, isRevealing } = useLoading();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations: ReturnType<typeof animate>[] = [];
    const observers: ReturnType<typeof onScroll>[] = [];
    const splits: ReturnType<typeof splitText>[] = [];
    let transitionReady: Promise<void> | undefined;
    let activeTransition: ViewTransition | undefined;
    let frame = 0;
    let version = 0;
    let shellEntered = false;

    function clear() {
        version++;
        cancelAnimationFrame(frame);
        observers.splice(0).forEach(observer => observer.revert());
        animations.splice(0).forEach(animation => animation.revert());
        splits.splice(0).forEach(split => split.revert());
    }
    function revealPage() {
        clear();
        if (reduced.matches || (isLoading.value && !isRevealing.value)) return;
        const main = document.querySelector<HTMLElement>("main#main");
        if (!main) return;
        if (!shellEntered) {
            shellEntered = true;
            animations.push(animate(document.querySelectorAll("header > a, header > nav"), {
                opacity: [0, 1], y: [-10, 0], duration: 550, ease: "out(3)",
            }));
        }
        // Animate meaningful units without moving containers that own fixed controls.
        const selector = "[data-reveal], h1:not(.sr-only), h2, h3, h4, p:not(.sr-only), figure, dl > div, li, footer, .action-link, .project-row--heading, aside > img";
        const candidates = [...main.querySelectorAll<HTMLElement>(selector)];
        const targets = candidates.filter((element) => {
            if (element.closest("[aria-hidden='true']") || !element.getClientRects().length) return false;
            return !candidates.some(parent => parent !== element && parent.contains(element));
        });
        let visibleIndex = 0;
        for (const element of targets) {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < 0) continue;
            const visible = rect.top < window.innerHeight - 24;
            const delay = visible ? Math.min(visibleIndex++ * 45, 270) : 0;
            const title = element.matches("h1") ? element.querySelector<HTMLElement>("[data-text-reveal]") : null;
            if (title && visible) {
                const split = splitText(title, { chars: true, words: false, lines: false, accessible: true });
                splits.push(split);
                animations.push(animate(split.chars, {
                    y: ["60%", "0%"], opacity: [0, 1], duration: 800,
                    delay: stagger(25, { start: delay }), ease: "out(4)",
                }));
                continue;
            }
            const observer = visible
                ? undefined
                : onScroll({
                        target: element, enter: "bottom-=40 top", leave: "top bottom", repeat: false,
                    });
            if (observer) observers.push(observer);
            animations.push(animate(element, {
                opacity: [0, 1], y: [visible ? 22 : 30, 0], duration: 700, delay, ease: "out(4)",
                ...(observer ? { autoplay: observer } : {}),
            }));
        }
    }
    async function schedule() {
        const scheduledVersion = ++version;
        await nextTick();
        await transitionReady?.catch(() => {});
        if (scheduledVersion !== version) return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            frame = requestAnimationFrame(revealPage);
        });
    }
    const stopTransition = app.hook("page:view-transition:start", (transition) => {
        activeTransition = transition;
        document.documentElement.dataset.viewTransition = "active";
        transitionReady = transition.ready;
        void transition.finished.finally(() => {
            if (activeTransition === transition) {
                activeTransition = undefined;
                transitionReady = undefined;
                delete document.documentElement.dataset.viewTransition;
            }
        }).catch(() => {});
    });
    const stopBefore = app.$router.beforeEach(() => clear());
    const stopAfter = app.$router.afterEach((to, from, failure) => {
        if (!failure && to.path === from.path) void schedule();
    });
    const stopPage = app.hook("page:loading:end", () => {
        void schedule();
    });
    const stopLoading = watch(isRevealing, (value) => {
        if (value) void schedule();
    });
    const onPreference = () => {
        if (reduced.matches) {
            activeTransition?.skipTransition();
            clear();
        }
        else void schedule();
    };
    reduced.addEventListener("change", onPreference);

    function dispose() {
        clear();
        activeTransition?.skipTransition();
        delete document.documentElement.dataset.viewTransition;
        stopTransition();
        stopBefore();
        stopAfter();
        stopPage();
        stopLoading();
        reduced.removeEventListener("change", onPreference);
    }
    if (import.meta.hot) import.meta.hot.dispose(dispose);
});
