import Lenis from "lenis";
import type { NuxtApp } from "#app";
import type { Ref } from "vue";
import { watch } from "vue";
import { START_LOCATION } from "vue-router";
import type { RouteLocationNormalized } from "vue-router";
import type { ScrollMoveOptions, ScrollTarget } from "../types/scroll";
import type { useScrollState } from "../composables/useScrollState";
import { isLocaleNavigation, scrollDownTarget } from "#shared/utils/navigation";

interface ScrollPosition {
    top: number;
    left: number;
}
export interface DocumentScroller {
    moveTo: (target: ScrollTarget, options?: ScrollMoveOptions) => void;
    cancelRequestedMove: () => void;
    restoreRoute: (to: RouteLocationNormalized, from: RouteLocationNormalized, saved: ScrollPosition | null) => false | Promise<false>;
    whenRestored: () => Promise<false>;
    dispose: () => void;
}
/** Sole document-scroll owner, including route/history restoration under the page cover. */
export function createDocumentScroll(app: NuxtApp, state: ReturnType<typeof useScrollState>, locked: Readonly<Ref<boolean>>): DocumentScroller {
    const { y, progress, introEnd } = state;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let requested = false;
    function updateProgress() {
        y.value = Math.max(0, window.scrollY);
        const limit = document.documentElement.scrollHeight - window.innerHeight;
        introEnd.value = scrollDownTarget(window.innerHeight, document.documentElement.scrollHeight);
        progress.value = limit > 0 ? Math.max(0, Math.min(100, y.value / limit * 100)) : 0;
    }
    function cancelRequestedMove() {
        if (requested)
            lenis?.scrollTo(window.scrollY, { immediate: true });
        requested = false;
    }
    function moveTo(target: ScrollTarget, { immediate = false }: ScrollMoveOptions = {}) {
        const element = typeof target === "string" ? document.querySelector<HTMLElement>(target) : typeof target === "number" ? null : target;
        const offset = element ? -(Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) : 0;
        if (lenis) {
            requested = !immediate;
            lenis.scrollTo(element || target, {
                immediate,
                force: immediate,
                offset,
                duration: 0.65,
                easing: t => 1 - (1 - t) ** 3,
                onComplete: () => {
                    requested = false;
                },
            });
        }
        else {
            const top = typeof target === "number" ? target : element ? element.getBoundingClientRect().top + window.scrollY + offset : 0;
            window.scrollTo({ top, behavior: "instant" });
        }
        updateProgress();
    }
    function suspend() {
        if (locked.value || document.hidden) {
            cancelRequestedMove();
            lenis?.stop();
        }
        else
            lenis?.start();
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
        if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key))
            cancelRequestedMove();
    }
    function onAnchor(event: MouseEvent) {
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
            return;
        const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
        if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download"))
            return;
        const url = new URL(anchor.href, location.href);
        if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash)
            return;
        let element: HTMLElement | null;
        try {
            element = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        }
        catch {
            return;
        }
        if (!element)
            return;
        event.preventDefault();
        if (url.hash === location.hash)
            moveTo(element);
        else
            void app.$router.push({ hash: url.hash });
        if (!element.hasAttribute("tabindex"))
            element.setAttribute("tabindex", "-1");
        element.focus({ preventScroll: true });
    }
    let mountedPath: string | undefined;
    let restorationFrame = 0;
    let restorationReady: Promise<false> = Promise.resolve(false);
    let pendingRestoration: {
        to: RouteLocationNormalized;
        from: RouteLocationNormalized;
        saved: ScrollPosition | null;
        resolve: (value: false) => void;
    } | undefined;
    function cancelRestoration() {
        cancelAnimationFrame(restorationFrame);
        pendingRestoration?.resolve(false);
        pendingRestoration = undefined;
    }
    function scheduleRestoration() {
        if (!pendingRestoration)
            return;
        cancelAnimationFrame(restorationFrame);
        restorationFrame = requestAnimationFrame(() => {
            const pending = pendingRestoration;
            pendingRestoration = undefined;
            if (!pending)
                return;
            const { to, from, saved } = pending;
            if (app.$router.currentRoute.value.fullPath !== to.fullPath)
                return pending.resolve(false);
            const samePage = to.path === from.path;
            let anchor: HTMLElement | null = null;
            try {
                anchor = to.hash ? document.getElementById(decodeURIComponent(to.hash.slice(1))) : null;
            }
            catch {
                // Invalid fragments fall back to the page start.
            }
            const target = saved?.top ?? anchor ?? (isLocaleNavigation(to.path, from.path) ? window.scrollY : 0);
            moveTo(target, { immediate: !!saved || !samePage });
            if (!saved && (!samePage || anchor)) {
                const focusTarget = anchor || document.querySelector<HTMLElement>("main#main");
                if (focusTarget) {
                    if (!focusTarget.hasAttribute("tabindex"))
                        focusTarget.setAttribute("tabindex", "-1");
                    focusTarget.focus({ preventScroll: true });
                }
            }
            pending.resolve(false);
        });
    }
    function restoreRoute(to: RouteLocationNormalized, from: RouteLocationNormalized, saved: ScrollPosition | null) {
        const samePage = to.path === from.path;
        if (samePage && !to.hash && !from.hash && !saved)
            return false;
        cancelRestoration();
        restorationReady = new Promise<false>((resolve) => {
            pendingRestoration = { to, from, saved, resolve };
        });
        if (samePage || from === START_LOCATION || mountedPath === to.path)
            scheduleRestoration();
        return restorationReady;
    }
    const stopWatch = watch(locked, suspend);
    const stopBefore = app.$router.beforeEach(() => {
        cancelRequestedMove();
        cancelRestoration();
        mountedPath = undefined;
    });
    const stopReveal = app.hook("page:loading:end", () => {
        mountedPath = app.$router.currentRoute.value.path;
        lenis?.resize();
        scheduleRestoration();
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
    const stopMounted = app.hook("app:mounted", initialize);
    function dispose() {
        cancelRestoration();
        stopMounted();
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
    return { moveTo, cancelRequestedMove, restoreRoute, whenRestored: () => restorationReady, dispose };
}
