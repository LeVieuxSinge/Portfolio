<!-- One complete numbered menu row, including its separator, is the animation target; modified links stay native. -->
<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{
    /** Equivalent localized router destination; modified clicks retain their native link behavior. */
    to: RouteLocationRaw;
    /** One-based visual navigation number; the label is formatted with a leading zero. */
    index: number;
    /** Current-language row label, fitted within its display column. */
    title: string;
    /** Mark the matching pathname with aria-current=page. */
    current?: boolean;
}>();
const emit = defineEmits<{
    /** Request the shell's covered menu handoff for an unmodified click. */
    navigate: [];
}>();

const label = useTemplateRef<HTMLElement>("label");

const { fit } = useFitText(label);

watch(() => props.title, () => nextTick(fit));

/**
 * Emit the covered-navigation request for an ordinary click; leave new-tab/download browser gestures native.
 */
function activate(event: MouseEvent) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    emit("navigate");
}
</script>

<template>
    <NuxtLink
        v-slot="{ href }"
        :to="to"
        custom
    >
        <a
            :href="href"
            class="group grid min-h-0 flex-1 grid-cols-[23px_minmax(0,1fr)_42px] items-center gap-[13px] border-b border-line transition-colors duration-300 hover:bg-surface md:grid-cols-[44px_minmax(0,1fr)_80px] md:gap-7 md:px-2"
            data-menu-row
            :aria-current="current ? 'page' : undefined"
            @click="activate"
        >
            <span
                class="font-mono text-[9px] text-muted md:text-[11px]"
                data-menu-element
            >0{{ index }}</span>
            <span class="display-type min-w-0 text-[min(9.2vw,9dvh)] md:text-[min(clamp(60px,6.3vw,108px),9dvh)]">
                <span
                    ref="label"
                    data-menu-label
                    class="inline-block whitespace-nowrap"
                >{{ title }}</span>
            </span>
            <Icon
                name="material-symbols:arrow-outward-rounded"
                aria-hidden="true"
                data-menu-element
                class="size-[min(40px,10dvh)] justify-self-end transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 md:size-[min(72px,10dvh)]"
            />
        </a>
    </NuxtLink>
</template>
