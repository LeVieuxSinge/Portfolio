<script setup lang="ts">
import { site } from "#shared/data/site";

const { t } = useI18n();
const localePath = useLocalePath();
const target = computed(() => localePath("/work"));
useHead(() => ({
    title: t("layouts.navigation.work"),
    meta: [{ "http-equiv": "refresh", "content": `0;url=${target.value}` }],
    link: [{ rel: "canonical", href: site.origin + target.value }],
}));
onMounted(() => navigateTo(target.value, { replace: true }));
</script>

<template>
    <main
        id="main"
        tabindex="-1"
        class="page-gutter py-20"
    >
        <ActionLink
            data-reveal
            :to="target"
        >
            {{ t('layouts.navigation.work') }}
        </ActionLink>
    </main>
</template>
