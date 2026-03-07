<script setup lang="ts">
import type { SharedCommonBadgeProps } from "./CommonBadge.vue";

const props = defineProps<SharedCommonBadgeProps>();
</script>

<template>
    <CommonBadge
        color="accent-4"
        icon="material-symbols:star"
        v-bind="props"
    >
        {{ $t("dict.featured") }}
    </CommonBadge>
</template>
