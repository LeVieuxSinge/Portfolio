<!-- Present selected projects in catalog order and the About/CV invitation. -->
<script setup lang="ts">
import { selectedProjects } from "#shared/data/projects";

const { t } = useI18n();
const localePath = useLocalePath();

usePageSeo(() => t("pages.work.title"), () => t("pages.work.note"));
</script>

<template>
    <main
        id="main"
        tabindex="-1"
        class="page-gutter"
    >
        <PageMasthead
            :title="t('pages.work.title')"
            :note="t('pages.work.note')"
            :count="selectedProjects.length"
        />
        <ProjectList
            :projects="selectedProjects"
            variant="work"
            :label="t('pages.work.listLabel')"
        />
        <section class="section-space flex flex-col justify-between gap-10 pb-20 md:flex-row md:items-end md:gap-[50px] md:pb-[110px]">
            <h2
                data-reveal
                class="max-w-[500px] text-[29px] leading-tight font-semibold tracking-[-0.035em] md:text-[38px]"
            >
                {{ t('pages.work.invitation') }}
            </h2>
            <ActionLink
                data-reveal
                :to="localePath('/about')"
            >
                {{ t('pages.work.aboutCv') }}
            </ActionLink>
        </section>
        <SiteFooter />
        <ScrollControl />
    </main>
</template>
