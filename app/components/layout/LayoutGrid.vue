<script setup lang="ts">
const props = defineProps<{
    as: keyof HTMLElementTagNameMap;
}>();
</script>

<template>
    <component
        :is="props.as"
        class="grid gap-x-6 grid-cols-4 md:grid-cols-6"
    >
        <slot />
    </component>
</template>
