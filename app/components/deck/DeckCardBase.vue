<script lang="ts">
export interface DeckCardBaseProps {
    path?: string;
    clickable?: boolean;
}
</script>

<script setup lang="ts">
const NuxtLinkLocale = resolveComponent("NuxtLinkLocale");

const props = withDefaults(defineProps<DeckCardBaseProps>(), {
    clickable: false,
});

const Tag = computed(() => props.path && props.clickable ? NuxtLinkLocale : props.clickable ? "button" : "div");
</script>

<template>
    <component
        :is="Tag"
        :to="props.path"
        class="aspect-[100/62.5] lg:aspect-[83.25/131.25] rounded-xl bg-background border-2 border-border"
        :class="{
            'cursor-pointer': props.clickable,
        }"
    >
        <slot />
    </component>
</template>
