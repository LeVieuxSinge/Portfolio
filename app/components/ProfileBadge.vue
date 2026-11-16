<script setup lang="ts">
import type { ProfileId } from "#shared/types/portfolio";

const props = defineProps<{ profile: ProfileId }>();
const { t } = useI18n();
const swatches: Record<ProfileId, string> = { frontend: "bg-frontend", uiux: "bg-uiux", art: "bg-art", programming: "bg-programming" };
</script>

<template>
    <span class="inline-flex max-w-full items-center gap-[7px] rounded-full border border-line px-2.5 py-[5px] font-mono text-[10px] leading-normal text-ink">
        <span
            class="size-[7px] shrink-0"
            :class="swatches[props.profile]"
            aria-hidden="true"
        />
        <span class="min-w-0 [overflow-wrap:anywhere]">{{ t(`role.${props.profile}`) }}</span>
    </span>
</template>
