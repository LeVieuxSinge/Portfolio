<script setup lang="ts">
import { animate, createTimeline, onScroll, splitText, stagger, createScope, utils, cubicBezier } from "animejs";
import type { Timeline } from "animejs";

const { isMobileOrTablet } = useDevice();

const refRoot = useTemplateRef<HTMLElement>("refRoot");

const { locale, switchLocale } = useLocale();

useSafeAnimations(() => {
    const root = unref(refRoot);
    if (!root) return;

    const scope = createScope({
        mediaQueries: { isSmall: "(max-width: 1024px)" },
        root: root,
    });

    scope.add((self) => {
        if (!self) return;

        const { isSmall } = self.matches;

        const timeline = self.keepTime(() => createTimeline({
            autoplay: onScroll({
                container: document.body || document.documentElement,
                target: self.root,
                enter: "top top",
                leave: "top bottom-=10%",
                sync: 0.8,
            }),
            defaults: {
                duration: 500, // 5%
                ease: cubicBezier(0.7, 0.1, 0.5, 0.9),
            },
        })) as Timeline;

        // 10%; Fade out OS version, buttons and footer
        timeline.add(utils.$(".anim-home-intro-fade"), {
            opacity: [1, 0],
            duration: 1000,
        });

        // 5%; Animate name: slide up and fade out, staggered by word
        splitText(`#anim-home-intro-text-1`, {
            words: { wrap: "clip" },
        }).addEffect(({ words }) => timeline.add(words, {
            translateY: [0, "-100%"],
            opacity: [1, 0],
            delay: stagger(200),
        }, "+=500"));

        // 25%; Animate each line: slide up and fade in, then slide up and fade out, staggered by word
        for (let i = 2; i <= 6; i++) {
            splitText(`#anim-home-intro-text-${i}`, {
                words: { wrap: "clip" },
            }).addEffect(({ words }) => {
                timeline.add(words, {
                    translateY: ["100%", 0],
                    opacity: [0, 1],
                    delay: stagger(200),
                }, "-=500");
                timeline.add(words, {
                    translateY: [0, "-100%"],
                    opacity: [1, 0],
                    delay: stagger(200),
                }, "+=2000");
            });
        }

        // 5%; Animate last line in with a different animation: slide up and fade in, staggered by word
        splitText(`#anim-home-intro-text-7`, {
            words: { wrap: "clip" },
        }).addEffect(({ words }) => timeline.add(words, {
            translateY: ["100%", 0],
            opacity: [0, 1],
            delay: stagger(200),
        }, "-=500"));

        // 30%; Animate the header to lose padding top
        timeline.add("#anim-home-header", {
            paddingTop: [isSmall ? "15dvh" : "25dvh", "0"],
            duration: 3000,
        }, "+=500");
        // Parallel; Animate the whole section up to hide it
        timeline.add("#anim-home-title", {
            opacity: [1, 0],
            duration: 2000,
        }, "<<+=500");

        timeline.init();
    });

    return () => {
        scope.revert();
    };
});

function scrollToSection(id: string) {
    const section = document.querySelector<HTMLElement>(`#${id}`);
    if (!section) return;

    const distance = section.offsetTop - window.scrollY;
    const maxDistance = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    // Scale the duration based on the distance to scroll, with a maximum of 2000ms
    const duration = Math.min(2000, Math.abs(distance) / maxDistance * 2000);

    animate([document.documentElement, document.body], {
        scrollTop: section.offsetTop,
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
    <section
        id="home-intro"
        ref="refRoot"
        class="relative h-[500dvh]"
    >
        <!-- Mobile -->
        <div
            v-if="isMobileOrTablet"
            class="sticky top-0 h-dvh"
        >
            <LayoutContainer class="h-full">
                <div class="relative h-full w-full flex flex-col justify-between gap-y-10">
                    <div
                        id="anim-home-header"
                        class="sticky top-0 flex flex-col gap-y-6 pt-[15dvh]"
                    >
                        <div class="w-full flex flex-col gap-y-4">
                            <OSVersion class="anim-home-intro-fade" />
                            <div
                                id="anim-home-title"
                                class="w-full flex flex-col gap-y-2"
                            >
                                <span class="font-label-sm text-accent-3">
                                    {{ $t("components.home.intro.subtitle") }}
                                </span>
                                <div class="relative flex flex-col h-10 w-full font-display-sm *:absolute">
                                    <span id="anim-home-intro-text-1">
                                        xavier champoux
                                    </span>
                                    <span id="anim-home-intro-text-2">
                                        {{ $t("components.home.intro.roles.frontend") }}
                                    </span>
                                    <span id="anim-home-intro-text-3">
                                        {{ $t("components.home.intro.roles.artist3d") }}
                                    </span>
                                    <span id="anim-home-intro-text-4">
                                        {{ $t("components.home.intro.roles.uiux") }}
                                    </span>
                                    <span id="anim-home-intro-text-5">
                                        {{ $t("components.home.intro.roles.gamedev") }}
                                    </span>
                                    <span id="anim-home-intro-text-6">
                                        {{ $t("components.home.intro.roles.programmer") }}
                                    </span>
                                    <span id="anim-home-intro-text-7">
                                        {{ $t("components.home.intro.roles.technical") }}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="anim-home-intro-fade flex gap-4">
                            <button
                                class="font-label-sm text-accent-3 bg-background-highlight rounded-md p-2 flex items-center gap-x-1 border border-accent-3 hover:bg-background-elevated transition-colors duration-300"
                                @click="scrollToSection('home-context')"
                            >
                                {{ $t("components.home.intro.links.start") }}
                                <Icon
                                    name="material-symbols:arrow-right-alt"
                                    size="20"
                                />
                            </button>
                            <NuxtLinkLocale
                                class="font-label-sm rounded-md p-2 flex items-center gap-x-1 hover:bg-background-elevated transition-colors duration-300"
                                to="/projects"
                            >
                                {{ $t("components.home.intro.links.projects") }}
                                <Icon
                                    name="material-symbols:playing-cards"
                                    size="20"
                                />
                            </NuxtLinkLocale>
                            <button
                                class="font-label-sm rounded-md p-2 flex items-center gap-x-1 hover:bg-background-elevated transition-colors duration-300"
                                @click="scrollToSection('home-about')"
                            >
                                {{ $t("components.home.intro.links.about") }}
                                <Icon
                                    name="material-symbols:alternate-email"
                                    size="20"
                                />
                            </button>
                        </div>
                    </div>

                    <!-- <div class="absolute bottom-[15dvh] left-0 inset-x-0 aspect-square pointer-events-none">
                        <SceneHead />
                    </div> -->

                    <div class="anim-home-intro-fade pb-20 flex flex-col items-center gap-y-4">
                        <ConsoleOutput
                            color="accent-1"
                            size="sm"
                        >
                            {{ $t("components.home.intro.ai") }}
                        </ConsoleOutput>
                        <button
                            class="font-label-sm text-muted underline"
                            @click="switchLocale"
                        >
                            {{ locale === "fr" ? "english" : "français" }}
                        </button>
                    </div>
                </div>
            </LayoutContainer>
        </div>

        <!-- Desktop -->
        <div
            v-else
            class="sticky top-0 h-dvh flex justify-between"
        >
            <div class="flex-none w-125 flex flex-col justify-between gap-y-10 px-12">
                <div
                    id="anim-home-header"
                    class="sticky top-0 flex flex-col items-start gap-y-6"
                >
                    <div class="w-full flex flex-col gap-y-4">
                        <OSVersion class="anim-home-intro-fade" />
                        <div
                            id="anim-home-title"
                            class="w-full flex flex-col gap-y-2"
                        >
                            <span class="font-label-md text-accent-3">
                                {{ $t("components.home.intro.subtitle") }}
                            </span>
                            <div class="relative flex flex-col h-15 w-full font-display-md text-6xl *:absolute">
                                <span id="anim-home-intro-text-1">
                                    xavier champoux
                                </span>
                                <span id="anim-home-intro-text-2">
                                    {{ $t("components.home.intro.roles.frontend") }}
                                </span>
                                <span id="anim-home-intro-text-3">
                                    {{ $t("components.home.intro.roles.artist3d") }}
                                </span>
                                <span id="anim-home-intro-text-4">
                                    {{ $t("components.home.intro.roles.uiux") }}
                                </span>
                                <span id="anim-home-intro-text-5">
                                    {{ $t("components.home.intro.roles.gamedev") }}
                                </span>
                                <span id="anim-home-intro-text-6">
                                    {{ $t("components.home.intro.roles.programmer") }}
                                </span>
                                <span id="anim-home-intro-text-7">
                                    {{ $t("components.home.intro.roles.technical") }}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="anim-home-intro-fade flex gap-4">
                        <button
                            class="font-label-sm text-accent-3 bg-background-highlight rounded-md p-2 flex items-center gap-x-1 border border-accent-3 hover:bg-background-elevated transition-colors duration-300"
                            @click="scrollToSection('home-context')"
                        >
                            {{ $t("components.home.intro.links.start") }}
                            <Icon
                                name="material-symbols:arrow-right-alt"
                                size="20"
                            />
                        </button>
                        <NuxtLinkLocale
                            class="font-label-sm rounded-md p-2 flex items-center gap-x-1 hover:bg-background-elevated transition-colors duration-300"
                            to="/projects"
                        >
                            {{ $t("components.home.intro.links.projects") }}
                            <Icon
                                name="material-symbols:playing-cards"
                                size="20"
                            />
                        </NuxtLinkLocale>
                        <button
                            class="font-label-sm rounded-md p-2 flex items-center gap-x-1 hover:bg-background-elevated transition-colors duration-300"
                            @click="scrollToSection('home-about')"
                        >
                            {{ $t("components.home.intro.links.about") }}
                            <Icon
                                name="material-symbols:alternate-email"
                                size="20"
                            />
                        </button>
                    </div>
                </div>

                <div class="anim-home-intro-fade flex-none pb-20 flex flex-col items-center gap-y-4">
                    <ConsoleOutput
                        color="accent-1"
                        size="sm"
                    >
                        {{ $t("components.home.intro.ai") }}
                    </ConsoleOutput>
                    <button
                        class="font-label-sm text-muted underline"
                        @click="switchLocale"
                    >
                        {{ locale === "fr" ? "english" : "français" }}
                    </button>
                </div>
            </div>

            <div class="flex-auto border-l border-l-border overflow-hidden">
                <SceneHead />
            </div>
        </div>
    </section>
</template>
