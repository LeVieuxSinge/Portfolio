<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
</script>

<template>
    <NuxtLink
        :to="localePath('/')"
        class="flex min-h-11 min-w-0 items-center gap-3 md:gap-[14px]"
        :aria-label="t('layouts.homeLabel')"
    >
        <ProfileLogo class="size-[23px] shrink-0 md:size-7" />
        <span class="hidden min-w-0 flex-col gap-0.5 md:flex">
            <span class="text-[11px] leading-snug font-semibold md:text-[13px]">Xavier Champoux</span>
            <span class="font-mono text-[8px] leading-normal text-muted md:text-[10px]">{{ t('layouts.descriptor') }}</span>
        </span>
    </NuxtLink>
</template>
