<script setup lang="ts">
import type { ArchiveState, Project } from "#shared/types/portfolio";
import { projects } from "#shared/data/projects";
import { archiveNeighbors, archiveQuery, nextSelectedProject } from "#shared/utils/catalog";

const props = defineProps<{ project: Project; state: ArchiveState }>();
const { t } = useI18n();
const localePath = useLocalePath();
const neighbors = computed(() => archiveNeighbors(projects, props.project.slug, props.state));
const query = computed(() => archiveQuery(props.state));
const nextWork = computed(() => nextSelectedProject(projects, props.project.slug));
</script>

<template>
    <nav
        v-if="project.featuredOrder !== undefined"
        class="section-space pb-20 md:pb-[110px]"
        :aria-label="t('pages.project.selectedNavigation')"
    >
        <h2 class="mb-[30px] text-[29px] font-semibold tracking-[-0.025em] md:text-[46px]">
            {{ t('pages.project.more') }}
        </h2>
        <div class="flex flex-col justify-between gap-10 md:flex-row md:items-end md:gap-20">
            <ActionLink :to="localePath('/work')">
                {{ t('pages.project.back') }}
            </ActionLink>
            <div
                v-if="nextWork"
                class="min-w-0 md:ml-auto"
            >
                <p class="eyebrow mb-[18px]">
                    {{ t('pages.project.next') }}
                </p>
                <ActionLink :to="localePath(`/project/${nextWork.slug}`)">
                    {{ nextWork.title }}
                </ActionLink>
            </div>
        </div>
    </nav>
    <nav
        v-else
        class="section-space flex flex-col justify-between gap-10 pb-20 md:flex-row md:gap-20 md:pb-[110px]"
        :aria-label="t('pages.project.neighbors')"
    >
        <div
            v-if="neighbors.previous"
            class="min-w-0"
        >
            <p class="eyebrow mb-[18px]">
                {{ t('pages.project.previous') }}
            </p>
            <ActionLink :to="{ path: localePath(`/project/${neighbors.previous.slug}`), query }">
                {{ neighbors.previous.title }}
            </ActionLink>
        </div>
        <div
            v-if="neighbors.next"
            class="min-w-0 md:ml-auto"
        >
            <p class="eyebrow mb-[18px]">
                {{ t('pages.project.next') }}
            </p>
            <ActionLink :to="{ path: localePath(`/project/${neighbors.next.slug}`), query }">
                {{ neighbors.next.title }}
            </ActionLink>
        </div>
    </nav>
</template>
