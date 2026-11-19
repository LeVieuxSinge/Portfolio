<script setup lang="ts">
import { site } from "#shared/data/site";

const { t } = useI18n();
</script>

<template>
    <footer
        data-reveal
        class="flex flex-wrap justify-between gap-x-5 gap-y-2 pt-10 pb-[35px] font-mono text-[10px] leading-relaxed text-muted max-md:pr-[76px]"
    >
        <span>© {{ site.copyrightYear }} {{ site.name }}</span>
        <span>{{ t('layouts.madeWith') }}</span>
    </footer>
</template>
