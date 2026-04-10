<script setup lang="ts">
import { createTimeline, onScroll, stagger, createScope, cubicBezier } from "animejs";
import type { Timeline } from "animejs";

const { isMobileOrTablet } = useDevice();

const { resolvedProjects } = useProjectsData();

function getProjectByIndex(index: number) {
    const randomIndex = (index - 1) % resolvedProjects.length;
    return resolvedProjects[randomIndex]!;
}

const refRoot = useTemplateRef<HTMLElement>("refRoot");
const showProjects = ref(false);
const enableHoverEffects = ref(false);

useSafeAnimations(() => {
    const root = unref(refRoot);
    if (!root) return;

    const scope = createScope({
        mediaQueries: { isSmall: "(max-width: 1024px)" },
        root: root,
    });

    scope.add((self) => {
        if (!self) return;

        const { isSmall } = self.matches || {};

        const timeline = self.keepTime(() => createTimeline({
            autoplay: onScroll({
                container: document.body || document.documentElement,
                target: self.root,
                enter: "bottom top",
                leave: "top bottom",
                sync: 0.8,
            }),
            defaults: {
                duration: 500, // 5%
                ease: cubicBezier(0.7, 0.1, 0.5, 0.9),
            },
        })) as Timeline;

        // Animate chat container: slide up and fade in
        timeline.add("#anim-context-chat", {
            translateY: ["20px", 0],
            opacity: [0, 1],
            duration: 500,
            ease: "easeOutQuad",
        }, "+=2000");

        // Animate human chat: slide up and fade in
        timeline.add("#anim-context-human-1", {
            translateY: ["20px", 0],
            opacity: [0, 1],
            duration: 500,
            ease: "easeOutQuad",
        });

        // Animate ai chat: slide up and fade in
        timeline.add("#anim-context-ai-1", {
            translateY: ["20px", 0],
            opacity: [0, 1],
            duration: 500,
            ease: "easeOutQuad",
        }, "+=1000");

        // Animate card: fade in
        timeline.add(".anim-context-cards", {
            scale: [0.95, 1],
            opacity: [0, 1],
            duration: 500,
            ease: "easeOutQuad",
            delay: stagger(300, { grid: [4, 4], from: "center" }),
        }, "+=1000");

        // Animate human chat: slide up and fade in
        timeline.add("#anim-context-human-2", {
            translateY: ["20px", 0],
            opacity: [0, 1],
            duration: 500,
            ease: "easeOutQuad",
        }, "+=2000");

        timeline.call(() => {
            showProjects.value = false;
        });

        // Animate ai chat: slide up and fade in
        timeline.add("#anim-context-ai-2", {
            translateY: ["20px", 0],
            opacity: [0, 1],
            duration: 500,
            ease: "easeOutQuad",
        }, "+=1000");

        timeline.call(() => {
            showProjects.value = true;
        });

        if (!isSmall) {
            // Animate human chat: slide up and fade in
            timeline.add("#anim-context-human-3", {
                translateY: ["20px", 0],
                opacity: [0, 1],
                duration: 500,
                ease: "easeOutQuad",
            }, "+=2000");

            timeline.call(() => {
                enableHoverEffects.value = false;
            });

            // Animate ai chat: slide up and fade in
            timeline.add("#anim-context-ai-3", {
                translateY: ["20px", 0],
                opacity: [0, 1],
                duration: 500,
                ease: "easeOutQuad",
            }, "+=1000");

            timeline.call(() => {
                enableHoverEffects.value = true;
            });
        }

        // Add some extra time before fading out for better readability
        timeline.add({
            duration: 10000,
        });

        timeline.init();
    });

    return () => {
        scope.revert();
    };
});
</script>

<template>
    <section
        id="home-context"
        ref="refRoot"
        class="relative h-[500dvh]"
    >
        <!-- Mobile -->
        <div
            v-if="isMobileOrTablet"
            class="sticky top-0 h-dvh"
        >
            <LayoutContainer
                id="anim-context-chat"
                class="h-full flex flex-col justify-between gap-y-10 py-21"
            >
                <div class="flex flex-col gap-y-3">
                    <!-- Chat Title -->
                    <div class="w-full flex justify-end font-label-sm text-muted">
                        <span>{{ $t("components.home.cards.title") }}</span>
                    </div>
                    <!-- Human Message -->
                    <div
                        id="anim-context-human-1"
                        class="flex justify-end"
                    >
                        <div class="bg-background-elevated text-accent-3 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                            {{ $t("components.home.cards.chat.human1") }}
                        </div>
                    </div>
                    <!-- A.I. Message -->
                    <div
                        id="anim-context-ai-1"
                        class="flex justify-start"
                    >
                        <div class="bg-background-elevated text-accent-1 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                            {{ $t("components.home.cards.chat.ai1") }}
                        </div>
                    </div>
                    <!-- Human Message -->
                    <div
                        id="anim-context-human-2"
                        class="flex justify-end"
                    >
                        <div class="bg-background-elevated text-accent-3 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                            {{ $t("components.home.cards.chat.human2") }}
                        </div>
                    </div>
                    <!-- A.I. Message -->
                    <div
                        id="anim-context-ai-2"
                        class="flex justify-start"
                    >
                        <div class="bg-background-elevated text-accent-1 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                            {{ $t("components.home.cards.chat.ai2") }}
                        </div>
                    </div>
                </div>

                <DeckShowcase
                    class="w-full flex-1 rounded-xl border border-border"
                    :row-count="3"
                    :col-count="3"
                >
                    <template #default="{ index }">
                        <div class="anim-context-cards w-85">
                            <Transition
                                enter-active-class="transition-opacity duration-500"
                                leave-active-class="transition-opacity duration-500"
                                enter-from-class="opacity-0"
                                leave-to-class="opacity-0"
                                mode="out-in"
                            >
                                <ProjectCard
                                    v-if="showProjects"
                                    :project="getProjectByIndex(index)"
                                    class="shadow-black!"
                                />
                                <DeckCard
                                    v-else
                                    class="shadow-black!"
                                >
                                    <template #tags>
                                        <CommonBadgeYear size="sm">
                                            {{ $t("dict.year") }}
                                        </CommonBadgeYear>
                                        <CommonBadgeDeck size="sm">
                                            {{ $t("dict.deck") }}
                                        </CommonBadgeDeck>
                                        <CommonBadgeTool size="sm">
                                            {{ $t("dict.tool") }}
                                        </CommonBadgeTool>
                                        <CommonBadgeRole size="sm">
                                            {{ $t("dict.role") }}
                                        </CommonBadgeRole>
                                    </template>
                                </DeckCard>
                            </Transition>
                        </div>
                    </template>
                </DeckShowcase>
            </LayoutContainer>
        </div>

        <!-- Desktop -->
        <div
            v-else
            class="sticky top-0 h-dvh"
        >
            <div class="size-full flex justify-between">
                <div class="flex-none w-125 flex items-center pl-12 pr-6 py-6">
                    <div
                        id="anim-context-chat"
                        class="w-full flex flex-col gap-y-2"
                    >
                        <!-- Chat Title -->
                        <div class="w-full flex justify-end font-label-sm text-muted">
                            <span>{{ $t("components.home.cards.title") }}</span>
                        </div>
                        <!-- Human Message -->
                        <div
                            id="anim-context-human-1"
                            class="flex justify-end"
                        >
                            <div class="bg-background-elevated text-accent-3 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                                {{ $t("components.home.cards.chat.human1") }}
                            </div>
                        </div>
                        <!-- A.I. Message -->
                        <div
                            id="anim-context-ai-1"
                            class="flex justify-start"
                        >
                            <div class="bg-background-elevated text-accent-1 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                                {{ $t("components.home.cards.chat.ai1") }}
                            </div>
                        </div>
                        <!-- Human Message -->
                        <div
                            id="anim-context-human-2"
                            class="flex justify-end"
                        >
                            <div class="bg-background-elevated text-accent-3 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                                {{ $t("components.home.cards.chat.human2") }}
                            </div>
                        </div>
                        <!-- A.I. Message -->
                        <div
                            id="anim-context-ai-2"
                            class="flex justify-start"
                        >
                            <div class="bg-background-elevated text-accent-1 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                                {{ $t("components.home.cards.chat.ai2") }}
                            </div>
                        </div>
                        <!-- Human Message -->
                        <div
                            id="anim-context-human-3"
                            class="flex justify-end"
                        >
                            <div class="bg-background-elevated text-accent-3 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                                {{ $t("components.home.cards.chat.human3") }}
                            </div>
                        </div>
                        <!-- A.I. Message -->
                        <div
                            id="anim-context-ai-3"
                            class="flex justify-start"
                        >
                            <div class="bg-background-elevated text-accent-1 font-label-sm rounded-md px-2 py-1 max-w-[80%]">
                                {{ $t("components.home.cards.chat.ai3") }}
                            </div>
                        </div>
                    </div>
                </div>

                <DeckShowcase
                    ref="refShowcaseCards"
                    class="h-full flex-auto border-l border-t border-border"
                    :row-count="7"
                    :col-count="7"
                >
                    <template #default="{ index }">
                        <div class="anim-context-cards w-83.25">
                            <Transition
                                enter-active-class="transition-opacity duration-500"
                                leave-active-class="transition-opacity duration-500"
                                enter-from-class="opacity-0"
                                leave-to-class="opacity-0"
                                mode="out-in"
                            >
                                <ProjectCard
                                    v-if="showProjects"
                                    :project="getProjectByIndex(index)"
                                    :hover-effect="enableHoverEffects"
                                    class="w-full shadow-black!"
                                />
                                <DeckCard
                                    v-else
                                    class="w-full shadow-black!"
                                >
                                    <template #tags>
                                        <CommonBadgeYear size="sm">
                                            {{ $t("dict.year") }}
                                        </CommonBadgeYear>
                                        <CommonBadgeDeck size="sm">
                                            {{ $t("dict.deck") }}
                                        </CommonBadgeDeck>
                                        <CommonBadgeTool size="sm">
                                            {{ $t("dict.tool") }}
                                        </CommonBadgeTool>
                                        <CommonBadgeRole size="sm">
                                            {{ $t("dict.role") }}
                                        </CommonBadgeRole>
                                    </template>
                                </DeckCard>
                            </Transition>
                        </div>
                    </template>
                </DeckShowcase>
            </div>
        </div>
    </section>
</template>
