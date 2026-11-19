<!-- Interpolate offset Manrope lines into a cross without relying on :hover surviving header Teleport moves. -->
<script setup lang="ts">
import { animate } from "animejs";
import { motionDurations } from "~/utils/motion/tokens";

const props = defineProps<{
    /** Visual cross state supplied by modal coordination, including the closing phase. */
    open: boolean;
    /** Short visible Manrope label; hidden visually at compact widths. */
    label: string;
    /** Localized open/close action name that remains available on mobile. */
    accessibleLabel: string;
}>();

const button = useTemplateRef<HTMLButtonElement>("button");

const finePointer = useMediaQuery("(hover: hover) and (pointer: fine) and (min-width: 701px)");
const reduced = usePreferredReducedMotion();
const { point } = usePointerTracker();

const hovered = computed(() => {
    const rect = button.value?.getBoundingClientRect();

    return !!rect && !!point.value && point.value.x >= rect.left && point.value.x <= rect.right
        && point.value.y >= rect.top && point.value.y <= rect.bottom;
});

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

// Shared pointer geometry survives Teleport reparenting without a :hover reset.

/**
 * Align the lines for keyboard-visible focus without treating every mouse focus as hover.
 */
function focus(event: FocusEvent) {
    focused.value = (event.currentTarget as HTMLElement).matches(":focus-visible");
}

onMounted(() => {
    watch([() => props.open, aligned, reduced], () => {
        animation?.cancel();
        animation = animate(progress, {
            open: Number(props.open), aligned: Number(aligned.value),
            duration: reduced.value === "reduce" ? 1 : motionDurations.icon, ease: "out(3)",
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
/* Fixed icon geometry survives header Teleport. AnimeJS owns each line’s live offset/rotation. */
.menu-toggle-lines {
    position: relative;
    display: block;
    width: 24px;
    height: 24px;
    flex: none;
}
.menu-toggle-lines > span {
    position: absolute;
    left: 3px;
    top: 11px;
    width: 18px;
    height: 1px;
    background: currentColor;
}
</style>
