import { createPageNavigation } from "~/utils/motion/navigation";
import type { PageNavigation } from "~/utils/motion/navigation";
import { createPageReveals } from "~/utils/motion/reveals";
import type { RevealScope } from "~/utils/motion/reveals";

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
    if (import.meta.hot)
        import.meta.hot.dispose(navigation.dispose);
    app.vueApp.onUnmount(navigation.dispose);
    return { provide: { pageTransition: navigation, reveals: { register: reveals.register } } };
});
