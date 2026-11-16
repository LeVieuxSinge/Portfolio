import type { Project } from "#shared/types/portfolio";
import { previewFrame } from "#shared/utils/preview";

export function useProjectPreview(projects: () => readonly Project[]) {
    const pointer = useMediaQuery("(hover: hover) and (pointer: fine)");
    const desktop = useMediaQuery("(min-width: 701px)");
    const reduced = usePreferredReducedMotion();
    const project = shallowRef<Project | null>(null);
    const position = shallowRef({ x: 0, y: 0, rotation: 0, width: 440, maxHeight: 300 });
    const keyboard = shallowRef(false);
    let focusedRow: HTMLElement | null = null;
    let cursor: { x: number; y: number } | null = null;
    let target = { x: 0, y: 0 };
    let angularVelocity = 0;
    const image = computed(() => project.value?.slug === "simona" ? "/images/projects/simona/0.webp" : project.value?.hero);
    const { pause, resume } = useRafFn(({ delta }) => {
        const step = Math.min(delta / 16.667, 2);
        const follow = 1 - 0.88 ** step;
        const current = position.value;
        const dx = target.x - current.x;
        const desiredAngle = Math.max(-12, Math.min(12, dx * 0.11));
        angularVelocity = (angularVelocity + (desiredAngle - current.rotation) * 0.065 * step) * 0.8 ** step;
        position.value = { ...current, x: current.x + dx * follow, y: current.y + (target.y - current.y) * follow, rotation: Math.max(-12, Math.min(12, current.rotation + angularVelocity * step)) };
        if (Math.abs(dx) < 0.1 && Math.abs(target.y - current.y) < 0.1 && Math.abs(current.rotation) < 0.1 && Math.abs(angularVelocity) < 0.05) pause();
    }, { immediate: false });
    function place(x: number, y: number, stationary = false) {
        const media = project.value?.media.find(item => item.src === image.value)
            || project.value?.media.find(item => item.type === "video" && item.poster === image.value)
            || project.value?.media[0];
        const frame = previewFrame(x, y, window.innerWidth, window.innerHeight, media?.width || 16, media?.height || 9);
        const { width, maxHeight } = frame;
        target = { x: frame.x, y: frame.y };
        if (stationary) {
            pause();
            angularVelocity = 0;
            position.value = { ...target, rotation: 0, width, maxHeight };
        }
        else {
            position.value = { ...position.value, width, maxHeight };
            resume();
        }
    }
    function show(item: Project, event: PointerEvent) {
        if (!desktop.value || !pointer.value || event.pointerType !== "mouse") return;
        cursor = { x: event.clientX, y: event.clientY };
        if (reduced.value === "reduce" && project.value?.slug === item.slug) return;
        const initial = !project.value;
        keyboard.value = false;
        focusedRow = null;
        project.value = item;
        place(cursor.x, cursor.y, initial || reduced.value === "reduce");
    }
    function focus(item: Project, event: FocusEvent) {
        const row = event.currentTarget as HTMLElement;
        if (!desktop.value || !row.matches(":focus-visible")) return;
        keyboard.value = true;
        focusedRow = row;
        project.value = item;
        const rect = row.getBoundingClientRect();
        place(window.innerWidth * 0.58, rect.top + rect.height / 2, true);
    }
    function clear() {
        pause();
        project.value = null;
        angularVelocity = 0;
        focusedRow = null;
    }
    function leave() {
        if (!keyboard.value) clear();
    }
    function scroll() {
        if (keyboard.value && focusedRow === document.activeElement) {
            const rect = focusedRow!.getBoundingClientRect();
            place(window.innerWidth * 0.58, rect.top + rect.height / 2, true);
        }
        else if (cursor && desktop.value && pointer.value) {
            const row = document.elementFromPoint(cursor.x, cursor.y)?.closest<HTMLElement>("[data-project-slug]");
            const item = projects().find(item => item.slug === row?.dataset.projectSlug);
            if (!item) return clear();
            const initial = !project.value;
            project.value = item;
            place(cursor.x, cursor.y, initial || reduced.value === "reduce");
        }
        else clear();
    }
    useEventListener("pointermove", (event: PointerEvent) => {
        if (event.pointerType === "mouse") cursor = { x: event.clientX, y: event.clientY };
    }, { passive: true });
    useEventListener("pointerout", (event: PointerEvent) => {
        if (!event.relatedTarget) {
            cursor = null;
            clear();
        }
    });
    watch([desktop, pointer, reduced], clear);
    useEventListener("scroll", scroll, { passive: true });
    useEventListener("resize", clear, { passive: true });
    return { project, image, position, enter: show, move: show, focus, leave, clear };
}
