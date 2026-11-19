import { animate, onScroll, splitText, stagger } from "animejs";
import { motionDurations } from "./tokens";
import { nextTick } from "vue";

/** A component-owned island excluded from the global element selector. */
export interface RevealScope {
    /** Prepare descendants once; true leaves locale/reduced-motion content static. */
    prepare: (staticSwap: boolean) => void;
    /** Restore styles and invalidate pending component-owned animation work. */
    reset: () => void;
}

/**
 * Own explicit page reveal targets, accessible text splits, and registered list scopes. This layer never initiates navigation.
 * @param options Readiness/policy supplied by the shell navigation owner.
 * @returns Idempotent preparation, invalidation, and per-list registration with an unregister callback.
 */
export function createPageReveals(options: {
    /** Live browser motion policy; no animated hiding is applied during SSR. */
    reduced: MediaQueryList;
    /** Prevent entry preparation before the loader/menu owner permits it. */
    blocked: () => boolean;
    /** Equivalent locale routes replace text without replaying initial entrances. */
    staticSwap: () => boolean;
    /** Await native snapshots and the scroll owner's restoration barrier. */
    ready: () => Promise<unknown>;
}) {
    // Disposable DOM effects are separate from component-owned reveal registrations.
    const animations: ReturnType<typeof animate>[] = [];
    const observers: ReturnType<typeof onScroll>[] = [];
    const splits: ReturnType<typeof splitText>[] = [];
    const scopes = new Map<HTMLElement, RevealScope>();

    // One frame/task/main identity is active at a time; clear() invalidates all three.
    let frame = 0;
    let settleFrame: (() => void) | undefined;
    let preparing: Promise<void> | undefined;
    let version = 0;
    let preparedMain: HTMLElement | undefined;
    let shellEntered = false;

    /**
     * Cancel the queued preparation frame and settle its promise so invalidated callers cannot remain pending.
     */
    function cancelFrame() {
        cancelAnimationFrame(frame);
        settleFrame?.();
        settleFrame = undefined;
    }

    /**
     * Invalidate asynchronous preparation, restore split text/styles, and reset registered list motion before the next handoff.
     */
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

    /**
     * Prepare only outer meaningful targets in the current main. Registered lists own their descendants; decorative/hidden content is excluded.
     */
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

    /**
     * Wait for Vue, native snapshots, and scroll restoration, then use two frames for stable mounted geometry. Generation checks discard stale work.
     */
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

    /**
     * Share concurrent preparation requests and clear the stored task only if it still belongs to this generation.
     * @returns A settled preparation promise, including cancellation.
     */
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

    /**
     * Give a list exclusive ownership of descendant reveals/layout effects.
     * @param root Mounted list element inside main.
     * @param scope Initial preparation and cleanup callbacks owned by that list.
     * @returns Unregister-and-reset cleanup for the component lifecycle.
     */
    function register(root: HTMLElement, scope: RevealScope) {
        scopes.set(root, scope);

        return () => {
            scope.reset();
            scopes.delete(root);
        };
    }

    return { preparePage, clear, register };
}
