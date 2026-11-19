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
        class="section-space flex flex-col justify-between gap-10 pb-20 md:flex-row md:items-center md:gap-20 md:pb-[110px]"
        :aria-label="t('pages.project.selectedNavigation')"
    >
        <div class="min-w-0">
            <h2
                data-reveal
                class="mb-[30px] text-[29px] font-semibold tracking-[-0.025em] md:text-[46px]"
            >
                {{ t('pages.project.more') }}
            </h2>
            <ActionLink
                data-reveal
                :to="localePath('/work')"
            >
                {{ t('pages.project.back') }}
            </ActionLink>
        </div>
        <div
            v-if="nextWork"
            class="min-w-0 self-end text-right md:ml-auto md:self-auto"
        >
            <p
                data-reveal
                class="eyebrow mb-[18px]"
            >
                {{ t('pages.project.next') }}
            </p>
            <ActionLink
                data-reveal
                :to="localePath(`/project/${nextWork.slug}`)"
            >
                {{ nextWork.title }}
            </ActionLink>
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
            <p
                data-reveal
                class="eyebrow mb-[18px]"
            >
                {{ t('pages.project.previous') }}
            </p>
            <ActionLink
                data-reveal
                :to="{ path: localePath(`/project/${neighbors.previous.slug}`), query }"
            >
                {{ neighbors.previous.title }}
            </ActionLink>
        </div>
        <div
            v-if="neighbors.next"
            class="min-w-0 self-end text-right md:ml-auto"
        >
            <p
                data-reveal
                class="eyebrow mb-[18px]"
            >
                {{ t('pages.project.next') }}
            </p>
            <ActionLink
                data-reveal
                :to="{ path: localePath(`/project/${neighbors.next.slug}`), query }"
            >
                {{ neighbors.next.title }}
            </ActionLink>
        </div>
    </nav>
</template>
