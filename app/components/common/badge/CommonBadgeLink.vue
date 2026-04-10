<script setup lang="ts">
import type { SharedCommonBadgeProps } from "./CommonBadge.vue";

const props = defineProps<SharedCommonBadgeProps>();
</script>

<template>
    <CommonBadge
        color="text"
        icon="material-symbols:arrow-outward"
        v-bind="props"
    >
        <slot />
    </CommonBadge>
</template>
