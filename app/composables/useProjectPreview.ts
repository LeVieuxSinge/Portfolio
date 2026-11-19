import type { Ref } from "vue";
import type { Project } from "#shared/types/portfolio";
import { previewFrame } from "#shared/utils/preview";

/**
 * Own preview selection and visibility while shared tracking and pursuit own pointer input/motion.
 * @param projects Current visible collection getter.
 * @param root Mounted list used to reject hit targets from unrelated content.
 * @returns Read-only selected project/image/position and row pointer/focus handlers; touch and compact layouts expose no preview.
 */
export function useProjectPreview(projects: () => readonly Project[], root: Ref<HTMLElement | null>) {
    const pointer = useMediaQuery("(hover: hover) and (pointer: fine)");
    const desktop = useMediaQuery("(min-width: 701px)");
    const reduced = usePreferredReducedMotion();

    const project = shallowRef<Project | null>(null);

    const { point, target } = usePointerTracker();
    const pursuit = usePreviewPursuit();

    const focusedRow = shallowRef<HTMLElement | null>(null);

    const image = computed(() => project.value?.preview || project.value?.hero);

    /**
     * Resolve the selected retained image's intrinsic ratio and pass a right-aligned viewport frame to pursuit.
     */
    function place(x: number, y: number, stationary = false) {
        const media = project.value?.media.find(item => item.src === image.value)
            || project.value?.media.find(item => item.type === "video" && item.poster === image.value)
            || project.value?.media[0];
        const frame = previewFrame(x, y, window.innerWidth, window.innerHeight, media?.width || 16, media?.height || 9);

        pursuit.place(frame, stationary);
    }

    /**
     * Select a mouse-hovered desktop project; reduced motion keeps the first placement stationary until the project changes.
     */
    function show(item: Project, event: PointerEvent) {
        if (!desktop.value || !pointer.value || event.pointerType !== "mouse")
            return;
        if (reduced.value === "reduce" && project.value?.slug === item.slug)
            return;

        const initial = !project.value;

        focusedRow.value = null;
        project.value = item;
        place(event.clientX, event.clientY, initial || reduced.value === "reduce");
    }

    /**
     * Show a stationary preview only for keyboard-visible desktop focus, using the focused row's center.
     */
    function focus(item: Project, event: FocusEvent) {
        const row = event.currentTarget as HTMLElement;

        if (!desktop.value || !row.matches(":focus-visible"))
            return;
        focusedRow.value = row;
        project.value = item;

        const rect = row.getBoundingClientRect();

        place(window.innerWidth * 0.58, rect.top + rect.height / 2, true);
    }

    /**
     * Hide selection, forget the focus owner, and stop pursuit; media failure uses this same recovery path.
     */
    function clear() {
        pursuit.stop();
        project.value = null;
        focusedRow.value = null;
    }

    /**
     * Hide mouse previews on row exit without dismissing a keyboard-owned preview.
     */
    function leave() {
        if (!focusedRow.value)
            clear();
    }

    /**
     * Reconcile focus/last-pointer selection with current row geometry, including rows moving after the final scroll event.
     */
    function scroll() {
        if (focusedRow.value && focusedRow.value === document.activeElement) {
            const rect = focusedRow.value.getBoundingClientRect();
            place(window.innerWidth * 0.58, rect.top + rect.height / 2, true);
        }
        else if (point.value && desktop.value && pointer.value) {
            const row = document.elementFromPoint(point.value.x, point.value.y)?.closest<HTMLElement>("[data-project-slug]");
            const item = row && root.value?.contains(row) ? projects().find(item => item.slug === row.dataset.projectSlug) : undefined;
            if (!item)
                return clear();
            const initial = !project.value;
            project.value = item;
            place(point.value.x, point.value.y, initial || reduced.value === "reduce");
        }
        else
            clear();
    }

    watch(point, (value) => {
        if (!value)
            clear();
    });
    watch([desktop, pointer, reduced], clear);
    watch(target, scroll);
    useEventListener("scroll", scroll, { passive: true });
    useEventListener("resize", clear, { passive: true });

    return { project: readonly(project), image, position: pursuit.position, enter: show, move: show, focus, leave, clear };
}
