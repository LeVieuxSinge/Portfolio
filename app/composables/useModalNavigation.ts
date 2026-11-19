import type { Ref } from "vue";

/** Own the persistent header's modal placement and Reka focus lifecycle. */
export function useModalNavigation(header: Ref<HTMLElement | null>, panel: Ref<HTMLElement | null>, host: Ref<HTMLElement | null>) {
    const app = useNuxtApp();
    const route = useRoute();
    const localePath = useLocalePath();
    const { isOpen } = useMenu();
    const motion = useMenuMotion(panel);
    const returningHeader = shallowRef(false);
    const phase = shallowRef<"closed" | "opening" | "open" | "closing">("closed");
    const teleported = computed(() => !!host.value && isOpen.value && !returningHeader.value);
    const iconOpen = computed(() => isOpen.value && phase.value !== "closing");
    let navigating = false;
    let disposed = false;

    async function opened(event: Event) {
        event.preventDefault();
        await nextTick();
        if (disposed || phase.value !== "opening") return;
        // Reka hid the header before Teleport moved that same node into the dialog.
        if (header.value?.closest("[role='dialog']")) {
            header.value.removeAttribute("aria-hidden");
            header.value.removeAttribute("data-aria-hidden");
        }
        header.value?.querySelector<HTMLButtonElement>("[data-menu-toggle]")?.focus();
        await motion.enter();
        if (!disposed && phase.value === "opening") phase.value = "open";
    }

    async function removeMenu() {
        if (disposed) return;
        returningHeader.value = true;
        await nextTick();
        if (disposed) return;
        isOpen.value = false;
        await nextTick();
        returningHeader.value = false;
        phase.value = "closed";
        motion.restore();
        if (navigating) document.querySelector<HTMLElement>("main#main")?.focus({ preventScroll: true });
        navigating = false;
    }

    async function close() {
        if (phase.value === "closing" || !isOpen.value) return;
        phase.value = "closing";
        await motion.exit(true);
        await removeMenu();
    }

    function requestState(open: boolean) {
        if (!open) void close();
        else if (!isOpen.value) {
            phase.value = "opening";
            isOpen.value = true;
        }
    }

    function restoreFocus(event: Event) {
        if (navigating) event.preventDefault();
    }

    async function followLink(target: string) {
        if (phase.value === "closing") return;
        if (target === route.path) return close();
        navigating = true;
        phase.value = "closing";
        try {
            await app.$pageTransition.navigateMenu(target, { exit: () => motion.exit(false), reveal: motion.revealPage, hold: motion.hold });
        }
        catch (cause) {
            console.error("[menu navigation]", cause);
        }
        finally {
            await removeMenu();
        }
    }

    function identityClick(event: MouseEvent) {
        if (!isOpen.value || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        void followLink(localePath("/"));
    }

    onBeforeUnmount(() => {
        disposed = true;
        isOpen.value = false;
    });
    return { isOpen, teleported, iconOpen, opened, requestState, restoreFocus, followLink, identityClick, settle: motion.settle };
}
