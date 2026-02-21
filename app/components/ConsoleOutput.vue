<script setup lang="ts">
const props = withDefaults(defineProps<{
    color?: "text" | "subtext" | "accent-1" | "accent-2" | "accent-3";
    size?: "sm" | "md" | "lg";
}>(), {
    color: "text",
    size: "md",
});
</script>

<template>
    <h5 :class="`font-label-${props.size} text-${props.color}`">
        > <slot />
    </h5>
</template>
