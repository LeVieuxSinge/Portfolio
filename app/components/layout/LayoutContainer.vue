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
        class="mx-auto px-4 w-full sm:max-w-xl md:max-w-2xl lg:max-w-5xl"
    >
        <slot />
    </component>
</template>
