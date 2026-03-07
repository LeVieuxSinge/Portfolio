<script lang="ts">
import type { RouterLinkProps } from "vue-router";

export interface SharedCommonBadgeProps {
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    clickable?: boolean;
    path?: RouterLinkProps["to"];
}
</script>

<script setup lang="ts">
const NuxtLinkLocale = resolveComponent("NuxtLinkLocale");

const props = withDefaults(defineProps<SharedCommonBadgeProps & {
    color?: "text" | "accent-1" | "accent-2" | "accent-3" | "accent-4";
    icon?: string;
}>(), {
    clickable: false,
    size: "md",
    disabled: false,
});

const textColorClass = computed(() => ({
    "text": "text-text",
    "accent-1": "text-accent-1",
    "accent-2": "text-accent-2",
    "accent-3": "text-accent-3",
    "accent-4": "text-accent-4",
}[props.color || "text"]));

const hoverColorClass = computed(() => ({
    "text": "hover:text-text",
    "accent-1": "hover:text-accent-1",
    "accent-2": "hover:text-accent-2",
    "accent-3": "hover:text-accent-3",
    "accent-4": "hover:text-accent-4",
}[props.color || "text"]));

const Tag = computed(() => props.path ? NuxtLinkLocale : "span");
const classes = computed(() => [
    props.disabled ? "text-muted" : props.clickable ? `text-muted ${hoverColorClass.value} transition-colors duration-250` : textColorClass.value,
].join(" "));
</script>

<template>
    <Tag
        :to="props.path"
        class="border border-border bg-background flex items-center"
        :class="[classes, {
            'font-label-sm px-1 py-0.5 gap-x-1 rounded-sm': props.size === 'sm',
            'font-label-md px-2 py-0.5 gap-x-2 rounded-md': props.size === 'md',
            'font-label-lg px-3 py-1 gap-x-3 rounded-md': props.size === 'lg',
        }]"
    >
        <slot />

        <Icon
            v-if="props.icon"
            :name="props.icon"
            :class="{
                'w-3 h-3': props.size === 'sm',
                'w-4 h-4': props.size === 'md',
                'w-6 h-6': props.size === 'lg',
            }"
        />
    </Tag>
</template>
