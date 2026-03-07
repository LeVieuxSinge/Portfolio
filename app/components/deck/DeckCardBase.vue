<script setup lang="ts">
const NuxtLinkLocale = resolveComponent("NuxtLinkLocale");

const props = withDefaults(defineProps<{
    featured?: boolean;
    path?: string;
    clickable?: boolean;
}>(), {
    featured: false,
    clickable: false,
});

const Tag = computed(() => props.path ? NuxtLinkLocale : "div");
</script>

<template>
    <component
        :is="Tag"
        :to="props.path"
        class="w-83.25 h-131.25 rounded-xl bg-background border-2"
        :class="{
            'border-accent-4': props.featured,
            'border-border': !props.featured,
            'cursor-pointer': props.clickable,
        }"
    >
        <slot />
    </component>
</template>
