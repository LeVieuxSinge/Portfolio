<!-- Reusable canonical profile label and swatch; original contribution IDs remain catalog facts. -->
<script setup lang="ts">
import { profiles } from "#shared/data/site";
import type { ProfileId } from "#shared/types/portfolio";

const props = defineProps<{
    /** Canonical profile ID resolving the shared swatch and role translation. */
    profile: ProfileId;
}>();

const { t } = useI18n();

const swatch = computed(() => profiles.find(profile => profile.id === props.profile)!.swatch);
</script>

<template>
    <span class="badge-shell items-center gap-[7px] px-2.5 py-[5px] text-[10px] text-ink">
        <span
            class="size-[7px] shrink-0"
            :class="swatch"
            aria-hidden="true"
        />
        <span class="min-w-0 [overflow-wrap:anywhere]">{{ t(`role.${props.profile}`) }}</span>
    </span>
</template>
