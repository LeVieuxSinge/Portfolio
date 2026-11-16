<script setup lang="ts">
import type { TagId } from "#shared/types/portfolio";

defineProps<{ tag: TagId; projectSlug?: string }>();
const { t } = useI18n();
</script>

<template>
    <span class="inline-flex max-w-full rounded-full border border-line px-[9px] py-1 font-mono text-[9px] leading-normal">
        {{ projectSlug === 'schluter' && tag === 'unrealengine' ? 'Unreal Engine 4' : t(`tool.${tag}`) }}
    </span>
</template>
