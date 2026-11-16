<script setup lang="ts">
import { animate } from "animejs";

const props = defineProps<{ open: boolean; label: string; accessibleLabel: string }>();
const button = useTemplateRef<HTMLButtonElement>("button");
const finePointer = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 701px)");
const reduced = usePreferredReducedMotion();
const hovered = shallowRef(false);
const focused = shallowRef(false);
const aligned = computed(() => finePointer.value && (hovered.value || focused.value));
const progress = { open: Number(props.open), aligned: 0 };
const rendered = shallowRef({ ...progress });
const lineTransforms = computed(() => {
    const closed = 1 - rendered.value.open;
    const offset = 3 * (1 - rendered.value.aligned) * closed;
    const angle = 45 * rendered.value.open;
    return [
        `translate(${-offset}px, ${-3 * closed}px) rotate(${angle}deg)`,
        `translate(${offset}px, ${3 * closed}px) rotate(${-angle}deg)`,
    ];
});
let animation: ReturnType<typeof animate> | undefined;

// Pointer geometry survives the header's move into/out of the dialog. Native
// :hover and CSS transitions can reset when Teleport reparents the same node.
function trackPointer(event: PointerEvent) {
    if (event.pointerType !== "mouse") return;
    const rect = button.value?.getBoundingClientRect();
    hovered.value = !!rect && event.clientX >= rect.left && event.clientX <= rect.right
        && event.clientY >= rect.top && event.clientY <= rect.bottom;
}
useEventListener("pointermove", trackPointer, { passive: true });
useEventListener("pointerout", (event: PointerEvent) => {
    if (!event.relatedTarget) hovered.value = false;
});
function focus(event: FocusEvent) {
    focused.value = (event.currentTarget as HTMLElement).matches(":focus-visible");
}
onMounted(() => {
    watch([() => props.open, aligned, reduced], () => {
        animation?.cancel();
        animation = animate(progress, {
            open: Number(props.open), aligned: Number(aligned.value),
            duration: reduced.value === "reduce" ? 1 : 400, ease: "out(3)",
            onUpdate: () => { rendered.value = { ...progress }; },
        });
    }, { immediate: true });
});
onBeforeUnmount(() => animation?.cancel());
</script>

<template>
    <button
        ref="button"
        type="button"
        class="menu-toggle flex min-h-11 min-w-11 items-center justify-center gap-3 font-sans text-[11px] md:justify-end"
        :aria-label="accessibleLabel"
        :data-open="open"
        data-menu-toggle
        @pointerenter="trackPointer"
        @focus="focus"
        @blur="focused = false"
    >
        <span class="max-md:hidden">{{ label }}</span>
        <span
            class="menu-toggle-lines"
            aria-hidden="true"
        >
            <span :style="{ transform: lineTransforms[0] }" />
            <span :style="{ transform: lineTransforms[1] }" />
        </span>
    </button>
</template>

<style scoped>
.menu-toggle-lines { position: relative; display: block; width: 24px; height: 24px; flex: none; }
.menu-toggle-lines > span { position: absolute; left: 3px; top: 11px; width: 18px; height: 1px; background: currentColor; }
</style>
