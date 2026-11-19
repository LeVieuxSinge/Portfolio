<script setup lang="ts">
import { localizedPath } from "#shared/utils/navigation";
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const { t, locale } = useI18n();
const { complete } = useLoading();
complete("locale");
complete("route");
onMounted(() => complete("shell"));
const home = computed(() => localizedPath("/", locale.value));
const missing = computed(() => props.error.statusCode === 404);
useHead(() => ({ title: t(missing.value ? "pages.error.title" : "pages.error.failed"), htmlAttrs: { lang: locale.value }, meta: [{ name: "robots", content: "noindex" }] }));
</script>

<template>
    <main class="page-gutter flex min-h-svh flex-col justify-center gap-8 bg-paper py-20 text-ink">
        <ProfileLogo class="size-9" />
        <p class="eyebrow">
            {{ error.statusCode || 500 }}
        </p>
        <h1 class="display-type max-w-[1100px] text-[clamp(30px,5vw,80px)] [overflow-wrap:anywhere]">
            {{ t(missing ? 'pages.error.title' : 'pages.error.failed') }}
        </h1>
        <p class="max-w-[65ch] text-muted">
            {{ t(missing ? 'pages.error.description' : 'pages.error.failedDescription') }}
        </p>
        <button
            v-if="!missing"
            type="button"
            class="action-link w-fit"
            @click="clearError()"
        >
            {{ t('pages.error.retry') }}
        </button>
        <a
            :href="home"
            class="action-link w-fit"
            @click.prevent="clearError({ redirect: home })"
        >{{ t('pages.error.home') }}<Icon
            name="material-symbols:arrow-outward-rounded"
            aria-hidden="true"
            class="size-6"
        /></a>
    </main>
</template>
