<script setup lang="ts">
const { locale, t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const route = useRoute();
const destination = computed(() => {
    const path = switchLocalePath(locale.value === "fr" ? "en" : "fr") || "/";
    return { path: path.split(/[?#]/)[0], query: route.query, hash: route.hash };
});
</script>

<template>
    <NuxtLink
        :to="destination"
        class="flex size-11 shrink-0 items-center justify-center font-mono text-[10px] md:text-[11px]"
        :lang="locale === 'fr' ? 'en' : 'fr'"
        :hreflang="locale === 'fr' ? 'en-CA' : 'fr-CA'"
        :aria-label="t('layouts.switchLanguage')"
    >
        {{ locale === 'fr' ? 'EN' : 'FR' }}
    </NuxtLink>
</template>
