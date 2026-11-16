<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

const props = defineProps<{ to: RouteLocationRaw; index: number; title: string; current?: boolean }>();
const emit = defineEmits<{ navigate: [] }>();
const label = useTemplateRef<HTMLElement>("label");
const { fit } = useFitText(label);
watch(() => props.title, () => nextTick(fit));
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
            class="group grid min-h-[110px] flex-1 grid-cols-[23px_minmax(0,1fr)_42px] items-center gap-[13px] border-b border-line py-5 transition-colors duration-300 hover:bg-surface md:min-h-[120px] md:grid-cols-[44px_minmax(0,1fr)_80px] md:gap-7 md:px-2"
            data-menu-row
            :aria-current="current ? 'page' : undefined"
            @click="activate"
        >
            <span
                class="font-mono text-[9px] text-muted md:text-[11px]"
                data-menu-element
            >0{{ index }}</span>
            <span class="display-type min-w-0 text-[9.2vw] md:text-[clamp(60px,6.3vw,108px)]">
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
                class="size-[40px] justify-self-end transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-focus-visible:translate-x-1 group-focus-visible:-translate-y-1 md:size-[72px]"
            />
        </a>
    </NuxtLink>
</template>
