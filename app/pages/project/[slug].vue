<script setup lang="ts">
import { projects } from "#shared/data/projects";

definePageMeta({ key: route => route.path });
const route = useRoute();
const { t } = useI18n();
const { state } = useArchiveState();
const project = computed(() => projects.find(item => item.slug === route.params.slug));
if (!project.value) throw createError({ statusCode: 404, statusMessage: "Project not found" });
usePageSeo(() => project.value?.title || t("pages.error.title"), () => project.value ? t(`${project.value.contentKey}.summary`) : t("pages.error.description"), () => project.value?.hero || "/portrait.webp");
</script>

<template>
    <main
        v-if="project"
        id="main"
        tabindex="-1"
        class="page-gutter"
    >
        <div class="pt-[45px] md:pt-[68px]">
            <p class="eyebrow mb-6">
                {{ t(project.featuredOrder !== undefined ? 'pages.project.selected' : 'pages.project.archived') }}
            </p>
            <h1 class="display-type text-[10.8vw] wrap-anywhere md:text-[clamp(70px,10.8vw,170px)]">
                <span
                    data-text-reveal
                    class="whitespace-normal"
                >{{ project.title }}</span>
            </h1>
            <ProjectFacts :project="project" />
        </div>
        <ul
            v-if="project.links.length"
            class="mt-8 mb-10 flex flex-wrap gap-x-8 gap-y-3 md:mt-10 md:mb-[60px]"
        >
            <li
                v-for="link in project.links"
                :key="link.url"
            >
                <ActionLink
                    :to="link.url"
                    external
                    small
                >
                    {{ t(link.labelKey) }}
                </ActionLink>
            </li>
        </ul>
        <div :class="project.links.length ? '' : 'mt-10 md:mt-[60px]'">
            <ProjectMedia
                v-if="project.media[0]"
                :media="project.media[0]"
                eager
            />
        </div>
        <div class="section-space mb-20 flex flex-col gap-[50px] md:mb-[160px] md:flex-row md:gap-[100px]">
            <section class="min-w-0 flex-1">
                <h2 class="section-label">
                    {{ t('pages.project.context') }}
                </h2>
                <p class="max-w-[65ch] text-[15px] leading-[1.8] md:text-[18px]">
                    {{ t(`${project.contentKey}.context`) }}
                </p>
            </section>
            <section class="min-w-0 flex-1">
                <h2 class="section-label">
                    {{ t('pages.project.contribution') }}
                </h2>
                <p class="max-w-[65ch] text-[15px] leading-[1.8] md:text-[18px]">
                    {{ t(`${project.contentKey}.contribution`) }}
                </p>
                <p
                    v-if="t(`${project.contentKey}.credits`)"
                    class="mt-6 max-w-[65ch] text-xs leading-relaxed text-muted"
                >
                    {{ t(`${project.contentKey}.credits`) }}
                </p>
            </section>
        </div>
        <div class="flex flex-col gap-20 md:gap-[160px]">
            <ProjectMedia
                v-for="media in project.media.slice(1)"
                :key="media.src"
                :media="media"
            />
        </div>
        <ProjectEnding
            :project="project"
            :state="state"
        />
        <SiteFooter />
        <ScrollControl />
    </main>
</template>
