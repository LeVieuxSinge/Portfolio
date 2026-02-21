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
            'shadow-md shadow-transparent hover:shadow-accent-4 transition-shadow duration-250': props.featured && props.clickable,
            'border-border': !props.featured,
            'cursor-pointer': props.clickable,
        }"
    >
        <slot />
    </component>
</template>
