import type { Project } from "#shared/types/portfolio";

export function useProjectPreview() {
    const pointer = useMediaQuery("(hover: hover) and (pointer: fine)");
    const desktop = useMediaQuery("(min-width: 701px)");
    const reduced = usePreferredReducedMotion();
    const project = shallowRef<Project | null>(null);
    const position = shallowRef({ x: 0, y: 0, rotation: 0 });
    const keyboard = shallowRef(false);
    let focusedRow: HTMLElement | null = null;
    let target = { x: 0, y: 0 };
    let angularVelocity = 0;
    const image = computed(() => project.value?.slug === "simona" ? "/images/projects/simona/0.webp" : project.value?.hero);
    const { pause, resume } = useRafFn(({ delta }) => {
        const step = Math.min(delta / 16.667, 2);
        const follow = 1 - 0.88 ** step;
        const current = position.value;
        const dx = target.x - current.x;
        const desiredAngle = Math.max(-16, Math.min(16, -dx * 0.11));
        angularVelocity = (angularVelocity + (desiredAngle - current.rotation) * 0.065 * step) * 0.8 ** step;
        position.value = {
            x: current.x + dx * follow,
            y: current.y + (target.y - current.y) * follow,
            rotation: current.rotation + angularVelocity * step,
        };
        if (Math.abs(dx) < 0.1 && Math.abs(target.y - current.y) < 0.1 && Math.abs(current.rotation) < 0.1 && Math.abs(angularVelocity) < 0.05) pause();
    }, { immediate: false });
    function place(clientX: number, clientY: number, stationary = false) {
        const width = Math.min(440, window.innerWidth - 112);
        const height = 300;
        target = {
            x: Math.max(56, Math.min(clientX - width / 2, window.innerWidth - width - 56)),
            y: Math.max(116, Math.min(clientY + 26, window.innerHeight - height - 40)),
        };
        if (stationary) {
            pause();
            angularVelocity = 0;
            position.value = { ...target, rotation: 0 };
        }
        else resume();
    }
    function enter(item: Project, event: PointerEvent) {
        if (!desktop.value || !pointer.value || event.pointerType !== "mouse") return;
        const wasVisible = !!project.value;
        focusedRow = null;
        keyboard.value = false;
        project.value = item;
        place(event.clientX, event.clientY, !wasVisible || reduced.value === "reduce");
    }
    function move(event: PointerEvent) {
        if (project.value && !keyboard.value && reduced.value !== "reduce") place(event.clientX, event.clientY);
    }
    function focus(item: Project, event: FocusEvent) {
        const row = event.currentTarget as HTMLElement;
        if (!desktop.value || !row.matches(":focus-visible")) return;
        keyboard.value = true;
        focusedRow = row;
        project.value = item;
        const rect = row.getBoundingClientRect();
        place(window.innerWidth * 0.68, rect.bottom, true);
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
            place(window.innerWidth * 0.68, focusedRow!.getBoundingClientRect().bottom, true);
        }
        else clear();
    }
    watch([desktop, pointer, reduced], clear);
    useEventListener("scroll", scroll, { passive: true });
    useEventListener("resize", clear, { passive: true });
    return { project, image, position, enter, move, focus, leave, clear };
}
