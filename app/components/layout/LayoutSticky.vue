<script setup lang="ts">
const props = withDefaults(defineProps<{
    as?: keyof HTMLElementTagNameMap;
    height?: string;
}>(), {
    as: "div",
    height: "100dvh",
});
</script>

<template>
    <component
        :is="props.as"
        class="relative"
    >
        <div
            class="sticky top-0"
            :style="props.height ? { height: props.height } : { height: '100dvh' }"
        >
            <slot />
        </div>
    </component>
</template>
