<script setup lang="ts">
const props = withDefaults(defineProps<{
    color?: "text" | "muted" | "accent-1" | "accent-2" | "accent-3";
    size?: "sm" | "md" | "lg";
}>(), {
    color: "text",
    size: "md",
});

const fontClasses = computed(() => {
    return {
        sm: "font-label-sm",
        md: "font-label-md",
        lg: "font-label-lg",
    }[props.size];
});

const colorClasses = computed(() => {
    return {
        "text": "text-text",
        "muted": "text-muted",
        "accent-1": "text-accent-1",
        "accent-2": "text-accent-2",
        "accent-3": "text-accent-3",
    }[props.color];
});
</script>

<template>
    <span
        class="inline-flex items-baseline gap-x-2"
        :class="[fontClasses, colorClasses]"
    >
        <span>> </span><slot />
    </span>
</template>
