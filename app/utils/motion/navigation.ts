import type { NuxtApp } from "#app";
import type { Ref } from "vue";
import { nextTick } from "vue";
import type { NavigationPhase } from "../../composables/useNavigationState";
import { isLocaleNavigation, needsCoveredNavigation } from "#shared/utils/navigation";
import { motionDurations } from "./tokens";
import { createAnimationScope } from "./scope";
import type { createPageReveals } from "./reveals";

/** Dependencies supplied by the shell plugin; this controller owns phase writes. */
interface NavigationOptions {
    /** Internal SSR-safe phase used by read-only header/cover facades. */
    phase: Ref<NavigationPhase>;
    /** Existing modal surface owns coverage while true. */
    menuOpen: Readonly<Ref<boolean>>;
    /** Entry surface requests its own preparation after essential readiness. */
    loading: Readonly<Ref<boolean>>;
    /** Native preference query; listener cleanup belongs to this controller. */
    reduced: MediaQueryList;
    /** Element/text preparation owner, independent of routing and covers. */
    reveals: ReturnType<typeof createPageReveals>;
    /** Mark equivalent locale navigation as a static text/content swap. */
    setStaticSwap: (value: boolean) => void;
}

/** Menu-owned visual operations; the controller supplies destination sequencing. */
interface MenuHandoff {
    /** Hide complete rows while retaining an opaque background. */
    exit: () => Promise<unknown>;
    /** Fade that background only after the latest destination is prepared. */
    reveal: () => Promise<unknown>;
    /** Synchronously re-cover an interrupted route without replacing the header. */
    hold: () => void;
}

/** Client-only shell service injected as `$pageTransition`. */
export interface PageNavigation {
    /** Deduplicated entry preparation; regular navigation also awaits cover exit. */
    preparePage: () => Promise<void>;
    /** Route beneath an existing menu surface, following later interruptions. */
    navigateMenu: (target: string, motion: MenuHandoff) => Promise<void>;
    /** Native snapshot completion barrier, or undefined when no snapshot is active. */
    whenNativeReady: () => Promise<unknown> | undefined;
    /** Settle waiters and release every owned hook, listener, frame, and effect. */
    dispose: () => void;
}

/**
 * Coordinate route readiness, opaque covers, native snapshots, and menu handoffs through one writable phase.
 * @param app Nuxt/router lifecycle host; installed once by the client plugin.
 * @param options Shared phase and read-only loader/menu policy.
 * @returns Shell services; dispose settles waiters and removes all registered hooks/listeners.
 */
export function createPageNavigation(app: NuxtApp, options: NavigationOptions): PageNavigation {
    const { phase, menuOpen, reduced, reveals } = options;

    const coverEffects = createAnimationScope();

    // Native snapshots and shared preparation belong to the current navigation.
    let transitionReady: Promise<unknown> | undefined;
    let activeTransition: ViewTransition | undefined;
    let preparation: Promise<void> | undefined;

    // Generation/target identity prevents old guards or frames revealing a newer page.
    let version = 0;
    let samePageUpdate = false;
    let menuTarget: string | undefined;
    let menuHandoff: MenuHandoff | undefined;
    let navigationTarget = "";

    // A superseded mount promise is resolved before a replacement is installed.
    let mountedTarget = "";
    let mountedReady: Promise<void> = Promise.resolve();
    let settleMounted = () => {};
    let disposed = false;

    /**
     * Settle a superseded mount barrier before waiting for the next pathname's page:finish hook.
     */
    function waitForMount(path: string) {
        settleMounted();
        mountedTarget = path;
        mountedReady = new Promise<void>((resolve) => {
            settleMounted = resolve;
        });
    }

    // Register before routing: a cached page can finish mounting immediately.
    const stopMounted = app.hook("page:finish", () => {
        if (app.$router.currentRoute.value.path === mountedTarget) settleMounted();
    });

    /**
     * Release navigation-derived blocking flags and the named-page snapshot suppression marker.
     */
    function finish() {
        phase.value = "idle";
        delete document.documentElement.dataset.pageHandoff;
    }

    /**
     * Interrupt the previous cover effect, wait for its conditional DOM, then animate opacity.
     * @param opacity Destination opacity, normally zero or one.
     * @param duration Duration in milliseconds; reduced motion uses one millisecond.
     */
    async function fadeCover(opacity: number, duration: number) {
        coverEffects.cancel();
        await nextTick();

        const cover = document.querySelector<HTMLElement>("[data-page-cover]");

        if (cover)
            await coverEffects.run(cover, { opacity, duration: reduced.matches ? 1 : duration, ease: "inOut(3)" });
    }

    /**
     * Fade out only the current generation's cover, release the phase, and focus main without moving the restored document.
     */
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

    /**
     * Deduplicate preparation and reject stale generations before touching new-page elements.
     * @returns A promise that includes the regular page-cover exit; menu/entry surfaces own their own exits.
     */
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
    // Cover → commit/mount → scroll restoration → target preparation → uncover.
    // Same-page URL updates bypass this cycle so Archive can retain its list instance.
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
    /** Release readiness on navigation/app failure while preserving existing coverage. */
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

    /**
     * Keep the existing menu opaque across routing and prepare the latest destination, including interrupted Back/Forward/locale navigation.
     * @param target Intended internal destination.
     * @param motion Menu-owned exit/reveal/hold operations; no header instance is replaced.
     * @returns Completion after reveal; finally releases ownership even when router navigation fails.
     */
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

    /** Stop decorative snapshot/reveal work while leaving the current page readable. */
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

    /**
     * Invalidate generations, settle mount/animation waiters, skip pending native snapshots, and unregister shell hooks/listeners.
     */
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
