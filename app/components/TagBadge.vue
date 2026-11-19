<!-- Tool/technique badge whose optional version wording comes from project data rather than slug-specific styling. -->
<script setup lang="ts">
import type { TagId } from "#shared/types/portfolio";

defineProps<{
    /** Canonical tool/technique translation ID. */
    tag: TagId;
    /** Optional authored proper-name/version override; otherwise use tool.<tag>. */
    label?: string;
}>();

const { t } = useI18n();
</script>

<template>
    <span class="badge-shell px-[9px] py-1 text-[9px]">
        {{ label || t(`tool.${tag}`) }}
    </span>
</template>
