<script setup lang="ts">
import type { SharedCommonBadgeProps } from "./CommonBadge.vue";

const props = defineProps<SharedCommonBadgeProps>();
</script>

<template>
    <CommonBadge
        color="accent-1"
        icon="material-symbols:handyman"
        v-bind="props"
    >
        <slot />
    </CommonBadge>
</template>
