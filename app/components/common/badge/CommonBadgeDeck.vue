<script setup lang="ts">
import type { SharedCommonBadgeProps } from "./CommonBadge.vue";

const props = defineProps<SharedCommonBadgeProps>();
</script>

<template>
    <CommonBadge
        color="accent-3"
        icon="material-symbols:playing-cards"
        v-bind="props"
    >
        <slot />
    </CommonBadge>
</template>
