<!-- Full-outline Reka radio-menu trigger with one typed option set and native focus/keyboard behavior. -->
<script setup lang="ts" generic="T extends string">
import { DropdownMenuContent, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuRoot, DropdownMenuTrigger } from "reka-ui";

import type { SelectOption } from "#shared/types/portfolio";

const props = defineProps<{
    /** Canonical controlled value; selection is read from the supplied options. */
    modelValue: T;
    /** Short localized field label visible inside the outlined trigger. */
    label: string;
    /** Full localized control name, combined with the selected option for assistive technology. */
    accessibleLabel: string;
    /** Typed choices shared by trigger and menu; only these values may be emitted. */
    options: readonly SelectOption<T>[];
}>();
const emit = defineEmits<{
    /** Emit the selected option's typed value; this component never changes the route itself. */
    "update:modelValue": [value: T];
}>();

const open = shallowRef(false);

const selected = computed(() => props.options.find(option => option.value === props.modelValue)?.label);

/**
 * Emit only a value present in the typed options; untrusted Reka payloads cannot introduce an invalid URL filter.
 */
function select(value: unknown) {
    const option = props.options.find(option => option.value === value);

    if (option) emit("update:modelValue", option.value);
}
</script>

<template>
    <DropdownMenuRoot
        v-model:open="open"
        :modal="false"
    >
        <DropdownMenuTrigger
            class="flex min-h-12 w-full items-center gap-[18px] rounded-full border border-line px-[18px] text-left font-mono text-[11px] md:text-xs"
            :aria-label="`${accessibleLabel}: ${selected}`"
        >
            <span class="shrink-0 text-muted">{{ label }}</span>
            <span class="min-w-0 flex-1">{{ selected }}</span>
            <Icon
                name="material-symbols:keyboard-arrow-down-rounded"
                class="size-4 shrink-0 transition-transform duration-300"
                :class="{ 'rotate-180': open }"
                aria-hidden="true"
            />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
            <DropdownMenuContent
                class="archive-dropdown no-scrollbar z-overlay-ui max-h-(--reka-dropdown-menu-content-available-height) w-(--reka-dropdown-menu-trigger-width) overflow-y-auto rounded-3xl border border-line bg-paper p-1.5 text-ink"
                align="start"
                :side-offset="8"
                :collision-padding="20"
                loop
                data-lenis-prevent
            >
                <div>
                    <DropdownMenuRadioGroup
                        :model-value="modelValue"
                        @update:model-value="select"
                    >
                        <DropdownMenuRadioItem
                            v-for="option in options"
                            :key="option.value"
                            :value="option.value"
                            :text-value="option.label"
                            class="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-full px-3 font-mono text-[11px] outline-none! data-highlighted:bg-ink data-highlighted:text-paper md:text-xs"
                        >
                            {{ option.label }}
                            <DropdownMenuItemIndicator class="size-1.5 shrink-0 rounded-full bg-current" />
                        </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </div>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>

<style>
/* Reka retains the closed portal for this exit animation; origin follows its collision-resolved placement. */
.archive-dropdown {
    transform-origin: var(--reka-dropdown-menu-content-transform-origin);
}
.archive-dropdown[data-state="open"] {
    animation: dropdown-reveal 260ms cubic-bezier(.22,1,.36,1) both;
}
.archive-dropdown[data-state="closed"] {
    animation: dropdown-hide 140ms ease-in both;
}
@keyframes dropdown-reveal {
    from {
        opacity: 0;
        clip-path: inset(0 0 100% 0 round 24px);
        transform: translateY(-6px);
    }
    to {
        opacity: 1;
        clip-path: inset(0 0 0 0 round 24px);
        transform: translateY(0);
    }
}
@keyframes dropdown-hide {
    to {
        opacity: 0;
        clip-path: inset(0 0 100% 0 round 24px);
        transform: translateY(-4px);
    }
}
</style>
