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

const { isLoading, isPageTransitioning } = useLoading();

function onPageLeave(el: Element, done: () => void) {
    isPageTransitioning.value = true;
    setTimeout(() => {
        done();
    }, 500); // Transition duration (should match the CSS transition duration)
}

function onPageEnter(el: Element, done: () => void) {
    setTimeout(() => {
        isPageTransitioning.value = false;
        setTimeout(() => {
            done();
        }, 500); // Transition duration (should match the CSS transition duration)
    }, 1500);
}

const isMouseAvailable = useMediaQuery("(hover: hover) and (pointer: fine)");
</script>

<template>
    <NuxtRouteAnnouncer />
    <AnimatedNoise />
    <CustomCursor v-if="isMouseAvailable" />
    <div
        id="teleport-popover"
        class="z-teleport-popover fixed inset-0 pointer-events-none"
    />
    <div
        id="teleport-modal"
        class="z-teleport-modal fixed inset-0 pointer-events-none"
    />

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
        <NavBar />

        <NuxtPage
            :transition="{
                css: false,
                onLeave: onPageLeave,
                onEnter: onPageEnter,
            }"
        />
    </LayoutContainer>
</template>
