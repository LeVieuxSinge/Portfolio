<script setup lang="ts">
import { TooltipProvider } from "reka-ui";

const { t } = useI18n();
const { isLoading, complete } = useLoading();
const { isOpen } = useMenu();
const pageCovered = useState<boolean>("page-covered", () => false);
const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
const reduced = usePreferredReducedMotion();
const mounted = useMounted();
const entryPending = computed(() => mounted.value && isLoading.value);
useHead({ noscript: [{ innerHTML: "<style>[data-entry-loader]{display:none!important}</style>" }] });
complete("locale");
const stopReadiness = useNuxtApp().hook("page:finish", () => complete("route"));
onBeforeUnmount(stopReadiness);
onMounted(() => complete("shell"));
</script>

<template>
    <TooltipProvider :delay-duration="250">
        <NuxtRouteAnnouncer />
        <SiteHeader :blocked="entryPending || pageCovered" />
        <div
            :inert="isOpen || entryPending || pageCovered || undefined"
            :aria-busy="entryPending || undefined"
        >
            <a
                href="#main"
                class="fixed top-2 left-2 z-[90] -translate-y-24 bg-ink px-4 py-3 text-paper focus:translate-y-0"
            >{{ t('layouts.skipToContent') }}</a>
            <div class="min-h-svh pt-(--header-height)">
                <NuxtPage />
            </div>
        </div>
        <div
            v-if="pageCovered"
            class="fixed inset-0 z-[45] bg-paper"
            style="opacity: 0"
            aria-hidden="true"
            data-page-cover
        />
        <ClientOnly>
            <AnimatedNoise />
            <CustomCursor v-if="isFinePointer && reduced !== 'reduce'" />
        </ClientOnly>
        <LoadingView v-if="isLoading" />
    </TooltipProvider>
</template>
