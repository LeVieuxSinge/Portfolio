<script setup lang="ts">
import { localeLocation } from "#shared/utils/navigation";

const { locale, t } = useI18n();
const route = useRoute();
const router = useRouter();
const emit = defineEmits<{ beforeSwitch: [] }>();
const destination = computed(() => localeLocation({ path: route.path, query: route.query, hash: route.hash }, locale.value === "fr" ? "en" : "fr"));
function switchLanguage(event: MouseEvent) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    emit("beforeSwitch");
    void router.push(destination.value);
}
</script>

<template>
    <NuxtLink
        v-slot="{ href }"
        :to="destination"
        custom
    >
        <a
            :href="href"
            class="flex size-11 shrink-0 items-center justify-center font-mono text-[10px] md:text-[11px]"
            :lang="locale === 'fr' ? 'en' : 'fr'"
            :hreflang="locale === 'fr' ? 'en-CA' : 'fr-CA'"
            :aria-label="t('layouts.switchLanguage')"
            @click="switchLanguage"
        >
            {{ locale === 'fr' ? 'EN' : 'FR' }}
        </a>
    </NuxtLink>
</template>
