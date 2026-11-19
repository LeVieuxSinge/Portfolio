import { createPageNavigation } from "~/utils/motion/navigation";
import type { PageNavigation } from "~/utils/motion/navigation";
import { createPageReveals } from "~/utils/motion/reveals";
import type { RevealScope } from "~/utils/motion/reveals";

/** Wire the client-only navigation controller to reveal preparation and the scroll/native readiness barriers. */
export default defineNuxtPlugin<{
    pageTransition: PageNavigation;
    reveals: {
        register: (root: HTMLElement, scope: RevealScope) => () => void;
    };
}>((app) => {
    const { isLoading, isRevealing } = useLoading();
    const { isOpen } = useMenu();
    const phase = useNavigationState();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Locale-only swaps adopt updated copy without replaying entrance effects.
    let staticSwap = false;
    const reveals = createPageReveals({
        reduced,
        blocked: () => (isLoading.value && !isRevealing.value) || (isOpen.value && !["menu-preparing", "menu-revealing"].includes(phase.value)),
        staticSwap: () => staticSwap,
        ready: async () => {
            await navigation.whenNativeReady();
            await app.$scroll?.whenRestored();
        },
    });
    const navigation = createPageNavigation(app, { phase, menuOpen: isOpen, loading: isLoading, reduced, reveals, setStaticSwap: (value) => {
        staticSwap = value;
    } });

    // App teardown and HMR share disposal so replaced plugins cannot retain guards or pending promises.
    if (import.meta.hot)
        import.meta.hot.dispose(navigation.dispose);
    app.vueApp.onUnmount(navigation.dispose);

    return { provide: { pageTransition: navigation, reveals: { register: reveals.register } } };
});
