<script setup lang="ts">
import { projects } from "#shared/data/projects";
import { browseArchive } from "#shared/utils/catalog";

const { t } = useI18n();
const { state, query, update } = useArchiveState();
const visibleProjects = computed(() => browseArchive(projects, state.value));
usePageSeo(() => t("pages.archive.title"), () => t("pages.archive.note"));
</script>

<template>
    <main
        id="main"
        tabindex="-1"
        class="page-gutter"
    >
        <PageMasthead
            :title="t('pages.archive.title')"
            :note="t('pages.archive.note')"
            :count="visibleProjects.length"
        />
        <ArchiveControls
            :role="state.role"
            :sort="state.sort"
            @change="update"
        />
        <p
            class="sr-only"
            role="status"
        >
            {{ t('pages.archive.results', { count: visibleProjects.length }) }}
        </p>
        <ProjectList
            :projects="visibleProjects"
            variant="archive"
            :query="query"
            :label="t('pages.archive.listLabel')"
        />
        <p
            v-if="!visibleProjects.length"
            class="py-20 text-xl"
        >
            {{ t('pages.archive.empty') }}
        </p>
        <div class="mt-[60px] md:mt-[110px]">
            <SiteFooter />
        </div>
        <ScrollControl />
    </main>
</template>
