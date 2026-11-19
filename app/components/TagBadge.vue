<script setup lang="ts">
import type { TagId } from "#shared/types/portfolio";

defineProps<{ tag: TagId; label?: string }>();
const { t } = useI18n();
</script>

<template>
    <span class="badge-shell px-[9px] py-1 text-[9px]">
        {{ label || t(`tool.${tag}`) }}
    </span>
</template>
