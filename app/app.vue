<script setup lang="ts">
import { TooltipProvider } from "reka-ui";

const { isLoading, isPageTransitioning } = useLoading();

useHead({
    title: "Xavier Champoux - Portfolio",
    htmlAttrs: {
        lang: "en",
    },
    // Restrain scrolling and interactions when loading or transitioning due to mobile not properly
    // supporting fixed elements
    bodyAttrs: {
        class: computed(() => (isLoading.value || isPageTransitioning.value) ? "overflow-hidden" : ""),
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
    isPageTransitioning.value = true;
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
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
        class="z-teleport-popover fixed top-0 left-0 w-dvw h-dvh pointer-events-none"
    />
    <div
        id="teleport-modal"
        class="z-teleport-modal fixed top-0 left-0 w-dvw h-dvh pointer-events-none"
    />

    <Teleport to="body">
        <Transition
            enter-active-class="transition-opacity duration-500"
            leave-active-class="transition-opacity duration-500"
            leave-to-class="opacity-0"
            enter-from-class="opacity-0"
        >
            <LoadingSplash v-if="isLoading" />
            <LoadingPage v-else-if="isPageTransitioning" />
        </Transition>
    </Teleport>

    <TooltipProvider>
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    css: false,
                    mode: 'out-in',
                    onLeave: onPageLeave,
                    onEnter: onPageEnter,
                }"
            />
        </NuxtLayout>
    </TooltipProvider>
</template>
