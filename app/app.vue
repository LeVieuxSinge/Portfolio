<script setup lang="ts">
useHead({
    title: "Xavier Champoux - Portfolio",
    htmlAttrs: {
        lang: "en",
    },
});

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

function onPageLeave(el: Element, done: () => void) {
    useLoadingStore().isPageTransitioning = true;
    setTimeout(() => {
        done();
    }, 500); // Transition duration (should match the CSS transition duration)
}

function onPageEnter(el: Element, done: () => void) {
    setTimeout(() => {
        useLoadingStore().isPageTransitioning = false;
        setTimeout(() => {
            done();
        }, 500); // Transition duration (should match the CSS transition duration)
    }, 1500);
}

const isMouseAvailable = useMediaQuery("(hover: hover) and (pointer: fine)");
const isLoading = computed(() => useLoadingStore().isLoading);
const isPageTransitioning = computed(() => useLoadingStore().isPageTransitioning);
</script>

<template>
    <NuxtRouteAnnouncer />
    <AnimatedNoise />
    <CustomCursor v-if="isMouseAvailable" />

    <Transition
        enter-active-class="transition-opacity duration-500"
        leave-active-class="transition-opacity duration-500"
        leave-to-class="opacity-0"
        enter-from-class="opacity-0"
    >
        <LoadingSplash v-if="isLoading" />
        <LoadingPage v-else-if="isPageTransitioning" />
    </Transition>

    <LayoutContainer>
        <HeaderBar />

        <NuxtPage
            :transition="{
                css: false,
                onLeave: onPageLeave,
                onEnter: onPageEnter,
            }"
        />
    </LayoutContainer>
</template>
