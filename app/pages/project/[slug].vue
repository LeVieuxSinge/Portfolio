<script setup lang="ts">
import { animate, createScope, cubicBezier, onScroll, splitText, stagger, utils } from "animejs";

const { isMobileOrTablet } = useDevice();
const route = useRoute();
const slug = route.params.slug as string;
const { resolvedProjects } = useProjectsData();
const project = resolvedProjects.find(p => p.slug === slug);

if (!project) {
    throw createError({
        fatal: true,
        statusCode: 404,
        statusMessage: "Project not found",
    });
}

const projectIndex = resolvedProjects.findIndex(p => p.slug === slug);
const prevProject = resolvedProjects[projectIndex - 1] || resolvedProjects[resolvedProjects.length - 1] || null;
const nextProject = resolvedProjects[projectIndex + 1] || resolvedProjects[0] || null;

const refRoot = useTemplateRef("refRoot");

useSafeAnimations(() => {
    const root = unref(refRoot);
    if (!root) return;

    const scope = createScope({
        root: root,
        mediaQueries: {
            isSmall: "(max-width: 1024px)",
            canHover: "(hover: hover) and (pointer: fine)",
        },
        defaults: {
            ease: cubicBezier(0.7, 0.1, 0.5, 0.9),
        },
    });

    scope.add((scope) => {
        if (!scope) return;
        const { matches: { isSmall } } = scope;

        splitText("#anim-project-title", {
            chars: { wrap: "clip" },
        }).addEffect(({ chars }) => animate(chars, {
            translateX: [-100, 0],
            delay: stagger(50),
            autoplay: onScroll({
                container: document.body || document.documentElement,
                enter: "bottom-=20% top",
            }),
        }));

        const targets = utils.$(".anim-project-all");
        for (const target of targets) {
            animate(target, {
                translateY: [20, 0],
                opacity: [0, 1],
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                }),
            });
        }

        if (isSmall) {
            // Animate the prev and next cards to fade in and slide up
            animate("#anim-project-prev-card", {
                translateY: [0, "25dvh"],
                rotate: [0, -8],
                ease: "outExpo",
                duration: 1500,
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                    enter: "bottom-=50% top",
                }),
            });
        }
        else {
            // Animate the prev card to slide and rotate to the left
            animate("#anim-project-prev-card", {
                translateX: [0, -300],
                translateY: [0, 50],
                rotate: [0, -8],
                ease: "outExpo",
                duration: 1500,
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                    enter: "bottom-=50% top",
                }),
            });
        }

        if (isSmall) {
            // Animate the next card to fade in and slide up
            animate("#anim-project-next-card", {
                translateY: [0, "-25dvh"],
                rotate: [0, 8],
                ease: "outExpo",
                duration: 1500,
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                    enter: "bottom-=50% top",
                }),
            });
        }
        else {
            // Animate the next card to slide and rotate to the right
            animate("#anim-project-next-card", {
                translateX: [0, 300],
                translateY: [0, 50],
                rotate: [0, 8],
                ease: "outExpo",
                duration: 1500,
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                    enter: "bottom-=50% top",
                }),
            });
        }
    });

    return () => {
        scope.revert();
    };
});

const localePath = useLocalePath();
function randomProject() {
    const filteredProjects = resolvedProjects.filter(p => p.slug !== project!.slug);
    const randomIndex = Math.floor(Math.random() * filteredProjects.length);
    const randomProject = filteredProjects[randomIndex]!;
    navigateTo(localePath(`/project/${randomProject.slug}`));
}
</script>

<template>
    <main
        ref="refRoot"
        class="px-2 lg:px-6"
    >
        <LayoutContainer>
            <div class="w-full flex flex-col gap-y-20 pt-20 pb-20">
                <!-- Header -->
                <section
                    v-if="isMobileOrTablet"
                    class="relative flex flex-col justify-between gap-y-8"
                >
                    <div class="anim-project-all h-[30dvh] w-full flex justify-center items-center bgmuted border border-border rounded-2xl overflow-hidden">
                        <DeckShowcase
                            class="size-full"
                            :row-count="isMobileOrTablet ? 3 : 5"
                            :col-count="isMobileOrTablet ? 3 : 5"
                        >
                            <template #default="{ index }">
                                <ProjectCard
                                    :key="index"
                                    :project="project"
                                    class="w-85 shadow-lg! shadow-black!"
                                />
                            </template>
                        </DeckShowcase>
                    </div>

                    <div class="z-1 flex flex-col gap-y-4">
                        <div class="anim-project-all flex gap-x-4">
                            <CommonBadgeFeature v-if="project.featured" />
                        </div>
                        <h1
                            id="anim-project-title"
                            class="font-display-lg"
                        >
                            {{ $t(project.name) }}
                        </h1>
                    </div>
                </section>
                <section
                    v-else
                    class="relative h-[60vh] flex items-center gap-y-4"
                >
                    <div class="z-1 flex flex-col gap-y-4">
                        <div class="anim-project-all flex gap-x-4">
                            <CommonBadgeFeature v-if="project.featured" />
                        </div>
                        <h1
                            id="anim-project-title"
                            class="font-display-lg"
                        >
                            {{ $t(project.name) }}
                        </h1>
                    </div>

                    <div class="anim-project-all absolute h-full w-full max-w-[80%] right-0 top-1/2 -translate-y-1/2 flex justify-center items-center bgmuted border border-border rounded-2xl overflow-hidden">
                        <DeckShowcase
                            class="size-full"
                            :row-count="isMobileOrTablet ? 3 : 5"
                            :col-count="isMobileOrTablet ? 3 : 5"
                        >
                            <template #default="{ index }">
                                <ProjectCard
                                    :key="index"
                                    :project="project"
                                    class="w-83.25 shadow-lg! shadow-black!"
                                />
                            </template>
                        </DeckShowcase>
                    </div>
                </section>

                <!-- Info -->
                <section class="flex flex-col gap-y-8">
                    <div class="flex flex-col gap-y-2 items-start">
                        <h2 class="anim-project-all font-label-md text-muted">
                            {{ $t("dict.year") }}
                        </h2>
                        <div class="flex flex-wrap gap-3">
                            <CommonBadgeYear
                                class="anim-project-all"
                                clickable
                                :path="{ name: 'projects', query: { filter: project.year } }"
                            >
                                {{ project.year }}
                            </CommonBadgeYear>
                        </div>
                    </div>

                    <div class="flex flex-col gap-y-2 items-start">
                        <h2 class="anim-project-all font-label-md text-muted">
                            {{ $t("dict.decks") }}
                        </h2>
                        <div class="flex flex-wrap gap-3">
                            <CommonBadgeDeck
                                v-for="deck in project.decks"
                                :key="deck.id"
                                class="anim-project-all"
                                clickable
                                :path="{ name: 'projects', query: { deck: deck.id } }"
                            >
                                {{ $t(deck.label) }}
                            </CommonBadgeDeck>
                        </div>
                    </div>

                    <div class="flex flex-col gap-y-2 items-start">
                        <h2 class="anim-project-all font-label-md text-muted">
                            {{ $t("dict.tools") }}
                        </h2>
                        <div class="flex flex-wrap gap-3">
                            <CommonBadgeTool
                                v-for="tool in project.tools"
                                :key="tool.id"
                                class="anim-project-all"
                                clickable
                                :path="{ name: 'projects', query: { filter: tool.id } }"
                            >
                                {{ $t(tool.name) }}
                            </CommonBadgeTool>
                        </div>
                    </div>

                    <div class="flex flex-col gap-y-2 items-start">
                        <h2 class="anim-project-all font-label-md text-muted">
                            {{ $t("dict.roles") }}
                        </h2>
                        <div class="flex flex-wrap gap-3">
                            <CommonBadgeRole
                                v-for="role in project.roles"
                                :key="role.id"
                                class="anim-project-all"
                                clickable
                                :path="{ name: 'projects', query: { filter: role.id } }"
                            >
                                {{ $t(role.name) }}
                            </CommonBadgeRole>
                        </div>
                    </div>

                    <div class="flex flex-col gap-y-2 items-start">
                        <h2 class="anim-project-all font-label-md text-muted">
                            {{ $t("dict.about") }}
                        </h2>
                        <p class="anim-project-all font-body-md">
                            {{ $t(project.about) }}
                        </p>
                    </div>

                    <div
                        v-if="project.link"
                        class="flex flex-col gap-y-2 items-start"
                    >
                        <h2 class="anim-project-all font-label-md text-muted">
                            {{ $t("dict.links") }}
                        </h2>
                        <div class="flex flex-wrap gap-3">
                            <a
                                v-for="link in project.link"
                                :key="link.url"
                                :href="link.url"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <CommonBadgeLink
                                    class="anim-project-all"
                                    clickable
                                >
                                    {{ $t(link.label) }}
                                </CommonBadgeLink>
                            </a>
                        </div>
                    </div>
                </section>

                <!-- Assets -->
                <section class="flex flex-col gap-y-8">
                    <template
                        v-for="asset in project.assets"
                        :key="asset.src"
                    >
                        <img
                            v-if="asset.type === 'image'"
                            class="anim-project-all w-full max-h-[90dvh] rounded-lg object-contain"
                            :src="asset.src"
                        >
                        <video
                            v-else-if="asset.type === 'video'"
                            class="anim-project-all w-full rounded-lg object-cover"
                            :src="asset.src"
                            muted
                            autoplay
                            loop
                        />
                    </template>
                </section>
            </div>
        </LayoutContainer>

        <!-- Next/Prev -->
        <section class="h-dvh flex justify-center items-center py-2 lg:py-6">
            <div class="relative flex justify-center items-center">
                <div
                    id="anim-project-prev-card"
                    class="absolute flex flex-col gap-y-2"
                >
                    <span class="max-lg:order-1 font-label-md text-toned mr-2">Last card</span>
                    <ProjectCard
                        v-if="prevProject"
                        :project="prevProject"
                        clickable
                        hover-effect
                        :shadows="false"
                        class="w-83.25 *:opacity-50 hover:*:opacity-100 *:transition-opacity *:duration-500"
                    />
                </div>
                <DeckBase
                    class="w-83.25 font-label-md text-muted/50 hover:text-muted transition-colors duration-250 flex justify-center text-center max-lg:items-center lg:pt-40 px-20 font"
                    clickable
                    @click="randomProject"
                >
                    Click here for a random card
                </DeckBase>
                <div
                    id="anim-project-next-card"
                    class="absolute flex flex-col items-end gap-y-2"
                >
                    <span class="font-label-md text-toned mr-2">Next card</span>
                    <ProjectCard
                        v-if="nextProject"
                        :project="nextProject"
                        clickable
                        hover-effect
                        :shadows="false"
                        class="w-83.25 *:opacity-50 hover:*:opacity-100 *:transition-opacity *:duration-500"
                    />
                </div>
            </div>
        </section>
    </main>
</template>
