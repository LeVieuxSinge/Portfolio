<!-- Own collection selection in the URL while leaving list animation and previews to the shared list. -->
<script setup lang="ts">
import { projects } from "#shared/data/projects";
import { browseArchive } from "#shared/utils/catalog";

const { t } = useI18n();
const { state, query, update } = useArchiveState();

// URL-derived selection changes only this collection; ProjectList owns its layout animation.
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
            data-reveal
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
            data-reveal
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
