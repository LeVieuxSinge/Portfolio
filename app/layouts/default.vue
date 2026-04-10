<script setup lang="ts">
import { animate, mapRange, utils } from "animejs";

const { isLoading, isPageTransitioning } = useLoading();
const { isOpen, toggle } = useMenu();
const { locale, switchLocale } = useLocale();
const { isMobileOrTablet } = useDevice();
const routePath = computed(() => useRouteBaseName()((useRoute())));

// Close menu on route or locale change
watch([routePath, locale], () => {
    if (isOpen.value) {
        toggle();
    }
});

const { resolvedProjects } = useProjectsData();
const isActive = computed(() => !isLoading.value && !isPageTransitioning.value);
const { y } = useWindowScroll();
const scrollProgress = computed(() => mapRange(y.value, 0, (document.documentElement.scrollHeight || 0) - (document.documentElement.clientHeight || 0), 0, 100));

useSafeAnimations(() => {
    utils.set(".anim-layout-default-menu-card", {
        rotate: () => `${Math.random() * 10 - 5}deg`,
    });

    return () => {};
});

function scrollToTop() {
    const maxDistance = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    // Scale the duration based on the distance to scroll, with a maximum of 2000ms
    const duration = Math.min(2000, Math.abs(window.scrollY) / maxDistance * 2000);

    animate([document.documentElement, document.body], {
        scrollTop: 0,
        duration,
        onBegin: () => {
            // Disable smooth scroll behavior. Causes delay.
            document.documentElement.style.scrollBehavior = "auto";
        },
        onComplete: () => {
            document.documentElement.style.scrollBehavior = "smooth";
        },
    });
}
</script>

<template>
    <div
        class="w-full lg:max-w-480 md:mx-auto opacity-0 transition-opacity duration-500"
        :class="{
            'opacity-100': isActive,
        }"
    >
        <slot />
    </div>

    <div
        class="z-screen fixed top-0 left-0 w-dvw h-dvh pointer-events-none"
    >
        <div
            class="w-full h-full lg:max-w-480 md:mx-auto flex items-center justify-center opacity-0 transition-all duration-500"
            :class="{
                'p-2 lg:p-6 opacity-100': isActive,
            }"
        >
            <!-- Black bars -->
            <figure class="fixed top-0 inset-x-0 h-2 lg:h-6 bg-background" />
            <figure class="fixed right-0 inset-y-0 w-2 lg:w-6 bg-background" />
            <figure class="fixed bottom-0 inset-x-0 h-2 lg:h-6 bg-background" />
            <figure class="fixed left-0 inset-y-0 w-2 lg:w-6 bg-background" />

            <div
                class="relative w-full h-full border border-border outline-5 outline-background transition-all duration-500 overflow-hidden"
                :class="{
                    'rounded-xl': isActive,
                }"
            >
                <!-- Scroll Progress -->
                <div class="absolute right-0 top-11.75 h-[calc(100%-48px)] w-1">
                    <figure
                        class="bg-toned"
                        :style="{ height: scrollProgress + '%' }"
                    />
                </div>

                <!-- Scroll to top -->
                <Transition
                    enter-active-class="transition-opacity duration-300"
                    leave-active-class="transition-opacity duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-from-class="opacity-100"
                >
                    <div
                        v-if="scrollProgress > 10"
                        class="absolute right-0 bottom-0 mb-6 mr-6"
                    >
                        <button
                            class="bg-background-highlighted text-muted font-label-sm rounded-md px-2 py-1 hover:text-toned transition-colors duration-300 pointer-events-auto"
                            @click="scrollToTop"
                        >
                            {{ $t("layouts.default.scrollToTop") }}
                        </button>
                    </div>
                </Transition>

                <!-- Menu -->
                <div
                    class="absolute inset-0 bg-background rounded-xl outline outline-border pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.648,-0.001,0.293,0.956)]"
                    :class="{
                        'translate-x-0 translate-y-0': isOpen,
                        'translate-x-[calc(100%-48px)] -translate-y-[calc(100%-48px)]': !isOpen,
                    }"
                >
                    <div class="size-full flex flex-col p-4 lg:p-30 gap-[8dvh]">
                        <AutomatedSearchbar
                            v-if="!isMobileOrTablet"
                            :enabled="isOpen"
                        />

                        <!-- Routes and Language -->
                        <div class="h-full lg:flex-auto flex flex-col lg:flex-row justify-between lg:items-end gap-8 lg:gap-20">
                            <nav class="flex-auto min-h-0 lg:h-full w-full">
                                <ul class="h-full w-full flex flex-col lg:flex-row max-lg:-space-y-10 lg:-space-x-5 font-title-lg max-lg:pt-21">
                                    <li class="max-lg:flex-1 min-h-0 flex justify-center items-end">
                                        <DeckCardBase
                                            path="/"
                                            clickable
                                            class="anim-layout-default-menu-card block h-full max-h-100 max-w-full"
                                        >
                                            <div class="h-full flex flex-col gap-2 p-4">
                                                <div class="flex justify-between">
                                                    <span>{{ $t('layouts.default.menu.routes.home.label') }}</span>
                                                    <Icon
                                                        name="lucide:arrow-right"
                                                        size="24"
                                                    />
                                                </div>
                                            </div>
                                        </DeckCardBase>
                                    </li>
                                    <li class="max-lg:flex-1 min-h-0 flex justify-center items-end">
                                        <DeckCardBase
                                            path="/projects"
                                            clickable
                                            class="anim-layout-default-menu-card block h-full max-h-100 max-w-full"
                                        >
                                            <div class="h-full flex flex-col gap-2 p-4">
                                                <div class="flex justify-between">
                                                    <span>{{ $t('layouts.default.menu.routes.projects.label') }}</span>
                                                    <Icon
                                                        name="lucide:arrow-right"
                                                        size="24"
                                                    />
                                                </div>
                                                <div class="flex gap-2">
                                                    <CommonBadgeYear>{{ new Date().getFullYear() }}</CommonBadgeYear>
                                                    <CommonBadgeFeature />
                                                </div>
                                                <div class="font-label-md text-muted">
                                                    {{ resolvedProjects.length }} {{ $t('layouts.default.menu.routes.projects.count') }}
                                                </div>
                                            </div>
                                        </DeckCardBase>
                                    </li>
                                    <li class="max-lg:flex-1 min-h-0 flex justify-center items-end">
                                        <DeckCardBase
                                            path="/about"
                                            clickable
                                            class="anim-layout-default-menu-card block h-full max-h-100 max-w-full"
                                        >
                                            <div class="h-full flex flex-col justify-between gap-2 p-4">
                                                <div class="flex justify-between">
                                                    <span>{{ $t('layouts.default.menu.routes.about.label') }}</span>
                                                    <Icon
                                                        name="lucide:arrow-right"
                                                        size="24"
                                                    />
                                                </div>
                                                <div class="font-body-md text-toned normal-case">
                                                    {{ $t("components.home.about.thanks") }} <span class="underline flashing-color font-bold">dev</span>.
                                                </div>
                                            </div>
                                        </DeckCardBase>
                                    </li>
                                </ul>
                            </nav>

                            <div class="flex-none flex justify-center">
                                <button
                                    class="font-label-sm text-muted underline flex justify-center items-center min-w-12 h-12"
                                    @click="switchLocale"
                                >
                                    {{ locale === "fr" ? "english" : "français" }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Menu Button -->
                <CommonTooltip :text="isOpen ? $t('layouts.default.menu.button.close.tooltip') : $t('layouts.default.menu.button.open.tooltip')">
                    <button
                        class="absolute top-0 right-0 w-12 h-12 flex justify-center items-center text-muted transition-all duration-250 hover:text-text pointer-events-auto"
                        :class="{
                            'top-2 right-2': isOpen,
                            'top-0 right-0': !isOpen,
                        }"
                        @click="toggle"
                    >
                        <Transition
                            enter-active-class="transition-opacity duration-250"
                            leave-active-class="transition-opacity duration-250"
                            enter-from-class="opacity-0"
                            leave-to-class="opacity-0"
                            mode="out-in"
                        >
                            <Icon
                                v-if="isOpen"
                                name="material-symbols:close"
                                size="24"
                            />
                            <Icon
                                v-else
                                name="material-symbols:arrow-outward"
                                size="24"
                                class="rotate-180"
                            />
                        </Transition>
                    </button>
                </CommonTooltip>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.flashing-color {
    animation: flashing-color 3s ease-in-out infinite;
}

@keyframes flashing-color {
    0% {
        color: var(--color-accent-1);
    }
    25% {
        color: var(--color-accent-2);
    }
    50% {
        color: var(--color-accent-3);
    }
    75% {
        color: var(--color-accent-4);
    }
    100% {
        color: var(--color-accent-1);
    }

}
</style>
