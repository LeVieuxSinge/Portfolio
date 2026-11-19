<!-- Freeze the outgoing page label through navigation, then fade the current page/project label at the shared intro threshold. -->
<script setup lang="ts">
import { projects } from "#shared/data/projects";
import { localizedPageKey } from "#shared/utils/navigation";

const route = useRoute();
const { t } = useI18n();
const { isOpen } = useMenu();
const { isNavigating } = usePageTransition();
const { y, introEnd } = useDocumentScroll();

const currentPage = computed(() => {
    const key = localizedPageKey(route.path).split("/")[1];

    if (key === "project") {
        const project = projects.find(item => item.slug === route.params.slug);
        return project ? `${t("pages.project.project")} / ${project.title}` : "";
    }

    return key === "work" || key === "archive" || key === "about" ? t(`pages.${key}.title`) : "";
});

const displayedPage = shallowRef(currentPage.value);

// Keep the outgoing label frozen until the covered page handoff has finished.
watch([currentPage, isNavigating, isOpen], ([text, navigating, menuOpen]) => {
    if (!navigating && !menuOpen) displayedPage.value = text;
});

const showPage = computed(() => !!displayedPage.value && introEnd.value > 0 && y.value >= introEnd.value - 2 && !isOpen.value && !isNavigating.value);
</script>

<template>
    <Transition name="header-page">
        <span
            v-if="showPage"
            class="pointer-events-none absolute left-1/2 max-w-[40%] -translate-x-1/2 truncate text-center font-sans text-xs font-normal tracking-[0.06em] uppercase md:text-sm"
            aria-hidden="true"
            data-header-page
        >{{ displayedPage }}</span>
    </Transition>
</template>
