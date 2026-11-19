import { animate, onScroll, splitText, stagger } from "animejs";
import { motionDurations } from "./tokens";
import { nextTick } from "vue";

export interface RevealScope {
    prepare: (staticSwap: boolean) => void;
    reset: () => void;
}
/** Own page elements and text splits; navigation only decides when preparation is safe. */
export function createPageReveals(options: {
    reduced: MediaQueryList;
    blocked: () => boolean;
    staticSwap: () => boolean;
    ready: () => Promise<unknown>;
}) {
    const animations: ReturnType<typeof animate>[] = [];
    const observers: ReturnType<typeof onScroll>[] = [];
    const splits: ReturnType<typeof splitText>[] = [];
    const scopes = new Map<HTMLElement, RevealScope>();
    let frame = 0;
    let settleFrame: (() => void) | undefined;
    let preparing: Promise<void> | undefined;
    let version = 0;
    let preparedMain: HTMLElement | undefined;
    let shellEntered = false;
    function cancelFrame() {
        cancelAnimationFrame(frame);
        settleFrame?.();
        settleFrame = undefined;
    }
    function clear() {
        version++;
        preparing = undefined;
        cancelFrame();
        preparedMain = undefined;
        observers.splice(0).forEach(observer => observer.revert());
        animations.splice(0).forEach(animation => animation.revert());
        splits.splice(0).forEach(split => split.revert());
        scopes.forEach(scope => scope.reset());
    }
    function revealPage() {
        if (options.blocked())
            return;
        const main = document.querySelector<HTMLElement>("main#main");
        if (!main || main === preparedMain)
            return;
        clear();
        preparedMain = main;
        if (options.staticSwap() || options.reduced.matches) {
            scopes.forEach((scope, root) => {
                if (main.contains(root))
                    scope.prepare(true);
            });
            return;
        }
        if (!shellEntered) {
            shellEntered = true;
            animations.push(animate(document.querySelectorAll("header > a, header > nav"), {
                opacity: [0, 1], y: [-10, 0], duration: 550, ease: "out(3)",
            }));
        }
        // Animate meaningful units without moving containers that own fixed controls.
        const selector = "[data-reveal]";
        const candidates = [...main.querySelectorAll<HTMLElement>(selector)];
        const targets = candidates.filter((element) => {
            if (element.matches(".sr-only") || element.closest("[data-reveal-scope]"))
                return false;
            const decorative = element.closest("[aria-hidden='true']");
            if ((decorative && main.contains(decorative)) || !element.getClientRects().length)
                return false;
            return !candidates.some(parent => parent !== element && parent.contains(element));
        });
        let visibleIndex = 0;
        for (const element of targets) {
            const rect = element.getBoundingClientRect();
            if (rect.bottom < 0)
                continue;
            const visible = rect.top < window.innerHeight - 24;
            const delay = visible ? Math.min(visibleIndex++ * 45, 270) : 0;
            const title = element.matches("h1") ? element.querySelector<HTMLElement>("[data-text-reveal]") : null;
            if (title && visible) {
                const split = splitText(title, { chars: true, words: true, lines: false, accessible: true });
                splits.push(split);
                animations.push(animate(split.chars, {
                    y: ["60%", "0%"], opacity: [0, 1], duration: motionDurations.title,
                    delay: stagger(25, { start: delay }), ease: "out(4)",
                }));
                continue;
            }
            const observer = visible
                ? undefined
                : onScroll({
                        target: element, enter: "bottom-=40 top", leave: "top bottom", repeat: false,
                    });
            if (observer)
                observers.push(observer);
            animations.push(animate(element, {
                opacity: [0, 1], y: [visible ? 22 : 30, 0], duration: motionDurations.reveal, delay, ease: "out(4)",
                ...(observer ? { autoplay: observer } : {}),
            }));
        }
        scopes.forEach((scope, root) => {
            if (main.contains(root))
                scope.prepare(false);
        });
    }
    async function runPreparation() {
        const scheduledVersion = ++version;
        cancelFrame();
        await nextTick();
        await options.ready();
        if (scheduledVersion !== version)
            return;
        await new Promise<void>((resolve) => {
            settleFrame = resolve;
            frame = requestAnimationFrame(() => {
                frame = requestAnimationFrame(() => {
                    settleFrame = undefined;
                    if (scheduledVersion === version)
                        revealPage();
                    resolve();
                });
            });
        });
    }
    function preparePage() {
        if (preparing)
            return preparing;
        const pending = runPreparation();
        preparing = pending;
        void pending.finally(() => {
            if (preparing === pending)
                preparing = undefined;
        }).catch(() => {
        });
        return pending;
    }
    function register(root: HTMLElement, scope: RevealScope) {
        scopes.set(root, scope);
        return () => {
            scope.reset();
            scopes.delete(root);
        };
    }
    return { preparePage, clear, register };
}
