<script setup lang="ts">
const { locale } = useI18n();
const { theme } = usePreferences();
const { isLoading } = useLoading();

useHead(() => ({
    title: "Xavier Champoux - Portfolio",
    htmlAttrs: {
        "lang": locale.value,
        "data-theme": theme.value,
    },
    bodyAttrs: {
        class: isLoading.value ? "overflow-hidden" : "",
    },
}));

useSeoMeta({
    title: "Xavier Champoux - Portfolio",
    description: "Xavier Champoux's personal portfolio.",
    robots: "index, follow",
    ogTitle: "Xavier Champoux - Portfolio",
    ogDescription: "Xavier Champoux's personal portfolio.",
    ogType: "website",
    ogUrl: "https://xavierchampoux.com",
    ogImage: "/icons/favicon-196.png",
    twitterCard: "summary_large_image",
    twitterTitle: "Xavier Champoux - Portfolio",
    twitterDescription: "Xavier Champoux's personal portfolio.",
    twitterImage: "/icons/favicon-196.png",
});

const isMouseAvailable = useMediaQuery("(hover: hover) and (pointer: fine)");
</script>

<template>
    <NuxtRouteAnnouncer />

    <TooltipProvider>
        <AnimatedNoise />
        <CustomCursor v-if="isMouseAvailable" />

        <Teleport to="body">
            <Transition
                enter-active-class="transition-opacity duration-500"
                leave-active-class="transition-opacity duration-500"
                leave-to-class="opacity-0"
                enter-from-class="opacity-0"
            >
                <ViewLoading v-if="isLoading" />
            </Transition>

            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </Teleport>
    </TooltipProvider>
</template>
