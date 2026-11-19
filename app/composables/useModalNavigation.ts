import type { Ref } from "vue";

/**
 * Own the single header's Teleport placement and Reka focus lifecycle while the navigation controller owns destination readiness.
 * @param header Persistent header element; never replaced by a second modal header.
 * @param panel Menu animation surface.
 * @param host Modal host receiving that same header instance.
 * @returns Derived placement/icon flags and modal/navigation event handlers; unmount prevents late DOM work.
 */
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

    /**
     * Prevent default autofocus until the header has moved into the dialog, restore its accessibility visibility, and focus the toggle.
     */
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

    /**
     * Return the header before unmounting the dialog, restore styles, and focus destination main without scrolling.
     */
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

    /**
     * Coalesce duplicate close requests, await the full exit, then let Reka restore the trigger's focus.
     */
    async function close() {
        if (phase.value === "closing" || !isOpen.value) return;
        phase.value = "closing";
        await motion.exit(true);
        await removeMenu();
    }

    /**
     * Translate Reka's controlled open requests into the owned opening/closing lifecycle.
     */
    function requestState(open: boolean) {
        if (!open) void close();
        else if (!isOpen.value) {
            phase.value = "opening";
            isOpen.value = true;
        }
    }

    /**
     * Suppress trigger restoration during destination navigation; main receives focus after the covered handoff.
     */
    function restoreFocus(event: Event) {
        if (navigating) event.preventDefault();
    }

    /**
     * Close a current-page menu link or delegate covered routing; always remove the modal after success, interruption, or failure.
     */
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

    /**
     * Route an unmodified logo click through the menu handoff while retaining native modified-link behavior.
     */
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
