<script setup lang="ts">
const props = withDefaults(defineProps<{
    as?: keyof HTMLElementTagNameMap;
}>(), {
    as: "div",
});
</script>

<template>
    <component
        :is="props.as"
        class="grid gap-x-6 grid-cols-4 auto-rows-auto md:grid-cols-6"
    >
        <slot />
    </component>
</template>
