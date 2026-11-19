import type { NuxtApp } from "#app";
import type { Ref } from "vue";
import { nextTick } from "vue";
import type { NavigationPhase } from "../../composables/useNavigationState";
import { isLocaleNavigation, needsCoveredNavigation } from "#shared/utils/navigation";
import { motionDurations } from "./tokens";
import { createAnimationScope } from "./scope";
import type { createPageReveals } from "./reveals";

interface NavigationOptions {
    phase: Ref<NavigationPhase>;
    menuOpen: Readonly<Ref<boolean>>;
    loading: Readonly<Ref<boolean>>;
    reduced: MediaQueryList;
    reveals: ReturnType<typeof createPageReveals>;
    setStaticSwap: (value: boolean) => void;
}
interface MenuHandoff {
    exit: () => Promise<unknown>;
    reveal: () => Promise<unknown>;
    hold: () => void;
}

export interface PageNavigation {
    preparePage: () => Promise<void>;
    navigateMenu: (target: string, motion: MenuHandoff) => Promise<void>;
    whenNativeReady: () => Promise<unknown> | undefined;
    dispose: () => void;
}
/** One shell-level owner for covers, navigation readiness, recovery, and cancellation. */
export function createPageNavigation(app: NuxtApp, options: NavigationOptions): PageNavigation {
    const { phase, menuOpen, reduced, reveals } = options;
    const coverEffects = createAnimationScope();
    let transitionReady: Promise<unknown> | undefined;
    let activeTransition: ViewTransition | undefined;
    let preparation: Promise<void> | undefined;
    let version = 0;
    let samePageUpdate = false;
    let menuTarget: string | undefined;
    let menuHandoff: MenuHandoff | undefined;
    let navigationTarget = "";
    let mountedTarget = "";
    let mountedReady: Promise<void> = Promise.resolve();
    let settleMounted = () => {};
    let disposed = false;

    function waitForMount(path: string) {
        settleMounted();
        mountedTarget = path;
        mountedReady = new Promise<void>((resolve) => {
            settleMounted = resolve;
        });
    }
    const stopMounted = app.hook("page:finish", () => {
        if (app.$router.currentRoute.value.path === mountedTarget) settleMounted();
    });
    function finish() {
        phase.value = "idle";
        delete document.documentElement.dataset.pageHandoff;
    }
    async function fadeCover(opacity: number, duration: number) {
        coverEffects.cancel();
        await nextTick();
        const cover = document.querySelector<HTMLElement>("[data-page-cover]");
        if (cover)
            await coverEffects.run(cover, { opacity, duration: reduced.matches ? 1 : duration, ease: "inOut(3)" });
    }
    async function uncover(token: number) {
        phase.value = "page-revealing";
        await fadeCover(0, motionDurations.pageReveal);
        if (token !== version || disposed)
            return;
        finish();
        coverEffects.revert();
        await nextTick();
        document.querySelector<HTMLElement>("main#main")?.focus({ preventScroll: true });
    }
    function preparePage() {
        if (preparation)
            return preparation;
        const token = version;
        if (phase.value.startsWith("page-"))
            phase.value = "page-preparing";
        const task = (async () => {
            await mountedReady;
            if (token !== version || disposed) return;
            await reveals.preparePage();
            if (token !== version || disposed)
                return;
            if (phase.value.startsWith("page-"))
                await uncover(token);
            else if (!menuOpen.value && !options.loading.value)
                finish();
        })();
        preparation = task;
        void task.finally(() => {
            if (preparation === task)
                preparation = undefined;
        }).catch(() => { });
        return task;
    }
    const stopTransition = app.hook("page:view-transition:start", (transition) => {
        if (reduced.matches) transition.skipTransition();
        activeTransition = transition;
        transitionReady = transition.finished;
        document.documentElement.dataset.viewTransition = "active";
        void transition.finished.finally(() => {
            if (activeTransition !== transition)
                return;
            activeTransition = undefined;
            transitionReady = undefined;
            delete document.documentElement.dataset.viewTransition;
        }).catch(() => { });
    });
    const stopBefore = app.$router.beforeEach(async (to, from) => {
        navigationTarget = to.fullPath;
        samePageUpdate = !!from.matched.length && to.path === from.path;
        if (samePageUpdate) {
            to.meta.viewTransition = false;
            if (menuHandoff && menuTarget !== to.path) {
                version++;
                menuHandoff.hold();
                settleMounted();
                mountedReady = Promise.resolve();
                preparation = undefined;
            }
            else if (phase.value.startsWith("page-")) {
                version++;
                coverEffects.cancel();
                settleMounted();
                preparation = undefined;
                void preparePage();
            }
            return;
        }
        if (menuHandoff && menuTarget !== to.path) menuHandoff.hold();
        const token = menuTarget === to.path ? version : ++version;
        preparation = undefined;
        waitForMount(to.path);
        options.setStaticSwap(!!from.matched.length && isLocaleNavigation(to.path, from.path));
        const changingPage = !!from.matched.length && needsCoveredNavigation(to.path, from.path);
        to.meta.viewTransition = changingPage && !menuOpen.value && !reduced.matches;
        if ((changingPage && !menuOpen.value && !reduced.matches) || phase.value.startsWith("page-")) {
            phase.value = "page-covering";
            document.documentElement.dataset.pageHandoff = "covered";
            await fadeCover(1, motionDurations.pageCover);
            if (token !== version || disposed)
                return false;
            phase.value = "page-covered";
        }
        else if (changingPage && !menuOpen.value)
            phase.value = "navigating";
        if (token === version)
            reveals.clear();
    });
    const recover = () => {
        settleMounted();
        if (phase.value.startsWith("page-"))
            void preparePage();
        else if (!menuHandoff)
            finish();
    };
    const stopAfter = app.$router.afterEach((to, _from, failure) => {
        if (failure && to.fullPath === navigationTarget)
            recover();
    });
    const stopError = app.$router.onError(recover);
    const stopAppError = app.hook("app:error", recover);
    const stopPage = app.hook("page:loading:end", () => {
        // Entry and menu surfaces request preparation themselves while opaque.
        if (!samePageUpdate && !menuOpen.value && !options.loading.value)
            void preparePage();
    });
    async function navigateMenu(target: string, motion: MenuHandoff) {
        const token = ++version;
        menuTarget = app.$router.resolve(target).path;
        menuHandoff = motion;
        phase.value = "menu-covered";
        try {
            await motion.exit();
            if (token === version && !disposed) await app.$router.push(target);
            // Back/Forward or locale navigation may replace the intended destination.
            // Keep this same opaque menu surface until the latest page is prepared.
            while (!disposed) {
                const current = version;
                await mountedReady;
                if (current !== version) continue;
                phase.value = "menu-preparing";
                await preparePage();
                if (current !== version) continue;
                phase.value = "menu-revealing";
                await motion.reveal();
                if (current === version) break;
            }
        }
        finally {
            if (menuHandoff === motion) {
                menuHandoff = undefined;
                menuTarget = undefined;
                if (!disposed) finish();
            }
        }
    }
    const onPreference = () => {
        activeTransition?.skipTransition();
        reveals.clear();
        if (phase.value === "page-covering") {
            coverEffects.cancel();
            const cover = document.querySelector<HTMLElement>("[data-page-cover]");
            if (cover) cover.style.opacity = "1";
        }
        else if (!menuOpen.value && !options.loading.value) void preparePage();
    };
    reduced.addEventListener("change", onPreference);
    function dispose() {
        disposed = true;
        version++;
        settleMounted();
        coverEffects.revert();
        reveals.clear();
        activeTransition?.skipTransition();
        delete document.documentElement.dataset.viewTransition;
        finish();
        [stopTransition, stopBefore, stopAfter, stopPage, stopMounted, stopError, stopAppError].forEach(stop => stop());
        reduced.removeEventListener("change", onPreference);
    }
    return { preparePage, navigateMenu, whenNativeReady: () => transitionReady?.catch(() => { }), dispose };
}
