<script setup lang="ts">
import type { SharedCommonBadgeProps } from "./CommonBadge.vue";

const props = defineProps<SharedCommonBadgeProps>();
</script>

<template>
    <CommonBadge
        color="text"
        v-bind="props"
    >
        <slot />
    </CommonBadge>
</template>
