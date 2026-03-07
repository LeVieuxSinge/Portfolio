<script setup lang="ts">
import { animate, onScroll } from "animejs";

const route = useRoute();
const slug = route.params.slug as string;
const project = useProjectsData().resolvedProjects.find(p => p.slug === slug);

const refShowcase = useTemplateRef("refShowcase");
const refShowcaseCards = useTemplateRef("refShowcaseCards");

if (!project) {
    throw createError({
        fatal: true,
        statusCode: 404,
        statusMessage: "Project not found",
    });
}

onMounted(() => {
    const container = document.querySelector("body");
    const showcase = unref(refShowcase);
    const showcaseCards = unref(refShowcaseCards);
    if (showcase && showcaseCards && container) {
        animate(showcaseCards, {
            translateY: ["50px", "-50px"],
            ease: "linear",
            autoplay: onScroll({
                container: container,
                target: showcase,
                enter: "top+=15% top",
                leave: "top+=5% bottom",
                sync: 0.6,
            }),
        });
    }
});
</script>

<template>
    <div class="w-full flex flex-col gap-y-20 pt-20 pb-20">
        <!-- Header -->
        <section class="relative h-[60vh] flex items-center gap-y-4">
            <div class="z-1 flex flex-col gap-y-4">
                <div class="flex gap-x-4">
                    <CommonBadgeFeature v-if="project.featured" />
                </div>
                <h1 class="font-display-lg">
                    {{ $t(project.name) }}
                </h1>
            </div>

            <div
                ref="refShowcase"
                class="absolute h-full w-full max-w-[80%] right-0 top-1/2 -translate-y-1/2 flex justify-center items-center bgmuted border border-border rounded-2xl overflow-hidden"
            >
                <div
                    ref="refShowcaseCards"
                    class="flex gap-x-10 -skew-x-6 rotate-12"
                >
                    <!-- Cols -->
                    <div
                        v-for="col in 4"
                        :key="col"
                        class="flex flex-col gap-y-10"
                        :class="[col % 2 === 1 ? 'pt-[15%]' : '']"
                    >
                        <!-- Rows -->
                        <ProjectCard
                            v-for="row in 4"
                            :key="row"
                            :project="project"
                            class="shadow-lg! shadow-black!"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Info -->
        <section class="flex flex-col gap-y-8">
            <div class="flex flex-col gap-y-2 items-start">
                <h2 class="font-label-md text-muted">
                    {{ $t("dict.year") }}
                </h2>
                <div class="flex flex-wrap gap-x-3">
                    <CommonBadgeYear
                        clickable
                        :path="{ name: 'projects', query: { filter: project.year } }"
                    >
                        {{ project.year }}
                    </CommonBadgeYear>
                </div>
            </div>

            <div class="flex flex-col gap-y-2 items-start">
                <h2 class="font-label-md text-muted">
                    {{ $t("dict.decks") }}
                </h2>
                <div class="flex flex-wrap gap-x-3">
                    <CommonBadgeDeck
                        v-for="deck in project.decks"
                        :key="deck.id"
                        clickable
                        :path="{ name: 'projects', query: { deck: deck.id } }"
                    >
                        {{ $t(deck.label) }}
                    </CommonBadgeDeck>
                </div>
            </div>

            <div class="flex flex-col gap-y-2 items-start">
                <h2 class="font-label-md text-muted">
                    {{ $t("dict.tools") }}
                </h2>
                <div class="flex flex-wrap gap-x-3">
                    <CommonBadgeTool
                        v-for="tool in project.tools"
                        :key="tool.id"
                        clickable
                        :path="{ name: 'projects', query: { filter: tool.id } }"
                    >
                        {{ $t(tool.name) }}
                    </CommonBadgeTool>
                </div>
            </div>

            <div class="flex flex-col gap-y-2 items-start">
                <h2 class="font-label-md text-muted">
                    {{ $t("dict.roles") }}
                </h2>
                <div class="flex flex-wrap gap-x-3">
                    <CommonBadgeRole
                        v-for="role in project.roles"
                        :key="role.id"
                        clickable
                        :path="{ name: 'projects', query: { filter: role.id } }"
                    >
                        {{ $t(role.name) }}
                    </CommonBadgeRole>
                </div>
            </div>

            <div class="flex flex-col gap-y-2 items-start">
                <h2 class="font-label-md text-muted">
                    {{ $t("dict.about") }}
                </h2>
                <p class="font-body-md">
                    {{ $t(project.about) }}
                </p>
            </div>
        </section>

        <!-- Assets -->
        <section class="flex flex-col gap-y-8">
            <template
                v-for="asset in project.assets"
                :key="asset.src"
            >
                <NuxtImg
                    v-if="asset.type === 'image'"
                    class="w-full rounded-lg object-cover"
                    :src="asset.src"
                />
                <video
                    v-else-if="asset.type === 'video'"
                    class="w-full rounded-lg object-cover"
                    :src="asset.src"
                    muted
                    autoplay
                    loop
                />
            </template>
        </section>
    </div>
</template>
