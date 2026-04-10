<script setup lang="ts">
import { animate, createScope, cubicBezier, mapRange, onScroll } from "animejs";

definePageMeta({
    name: "projects",
});

const { isMobileOrTablet } = useDevice();
const route = useRoute();
const router = useRouter();
const refHeader = useTemplateRef("refHeader");
const refTitle = useTemplateRef("refTitle");
const refFilters = useTemplateRef("refFilters");
const { tools, roles, resolvedProjects } = useProjectsData();
const { deckOptions, sortByOptions, tagOptions, selectedDeck, selectedSortBy, selectedTag, hasActiveFilters } = useFilters();

const filteredProjects = computed(() => {
    return resolvedProjects.filter((project) => {
        // Filter by deck
        if (selectedDeck.value.length > 0 && !selectedDeck.value.some(d => project.decks.some(pd => pd.id === d.value))) {
            return false;
        }

        // Filter by tag (year, tools, roles, ...)
        if (selectedTag.value.length > 0 && !selectedTag.value.some(f => project.tools.some(t => t.id === f.value) || project.roles.some(r => r.id === f.value) || project.year.toString() === f.value)) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        for (const criterion of selectedSortBy.value.map(s => s.value)) {
            if (criterion === "featured") {
                if (a.featured && !b.featured) return -1;
                if (!a.featured && b.featured) return 1;
            }
            else if (criterion === "year") {
                if (a.year > b.year) return -1;
                if (a.year < b.year) return 1;
            }
            else if (criterion === "name") {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            }
        }
        return 0;
    });
});

watch(selectedDeck, (newVal) => {
    router.replace({
        query: {
            ...route.query,
            deck: newVal.length > 0 ? newVal.map(d => d.value).join(",") : undefined,
        },
    });
});

watch(selectedSortBy, (newVal) => {
    router.replace({
        query: {
            ...route.query,
            sort: newVal.length > 0 ? newVal.map(s => s.value).join(",") : undefined,
        },
    });
});

watch(selectedTag, (newVal) => {
    router.replace({
        query: {
            ...route.query,
            filter: newVal.length > 0 ? newVal.map(f => f.value).join(",") : undefined,
        },
    });
});

useSafeAnimations(() => {
    // Parse query parameters to set initial filter/sort state
    const { deck, sort, filter } = route.query;
    if (typeof deck === "string") {
        selectedDeck.value = deck.split(",").map(d => ({ label: `deck.${d}.label`, value: d }));
    }
    if (typeof sort === "string") {
        selectedSortBy.value = sort.split(",").map(s => ({ label: `filter.sortBy.${s}`, value: s }));
    }
    if (typeof filter === "string") {
        const filterValues = filter.split(",");
        const parsedTools = filterValues.filter(f => tools.some(t => t.id === f)).map(f => ({ label: `tool.${f}`, value: f }));
        const parsedRoles = filterValues.filter(f => roles.some(r => r.id === f)).map(f => ({ label: `role.${f}`, value: f }));
        const parsedYears = filterValues.filter(f => resolvedProjects.some(p => p.year.toString() === f)).map(f => ({ label: f, value: f }));
        selectedTag.value = [...parsedTools, ...parsedRoles, ...parsedYears];
    }

    // Animate header on scroll
    const scope = createScope({
        mediaQueries: { isSmall: "(max-width: 1024px)" },
        defaults: {
            ease: cubicBezier(0.7, 0.1, 0.5, 0.9),
        },
    });

    scope.add((scope) => {
        if (!scope) return;
        const { matches } = scope;

        const header = unref(refHeader);
        const title = unref(refTitle);
        const filters = unref(refFilters);
        if (!header || !title || !filters) return;

        const { isSmall } = matches;

        animate(title, {
            translateY: ["0px", isSmall ? "20dvh" : "20dvh"],
            autoplay: onScroll({
                container: document.body || document.documentElement,
                target: header,
                enter: "top+=15% top",
                leave: "top+=5% bottom",
                sync: 0.6,
            }),
        });

        if (!isSmall) {
            animate(filters, {
                translateY: ["0px", isSmall ? "5dvh" : "10dvh"],
                autoplay: onScroll({
                    container: document.body || document.documentElement,
                    target: header,
                    enter: "top+=15% top",
                    leave: "top+=5% bottom",
                    sync: 0.6,
                }),
            });
        }
    });

    return () => {
        scope.revert();
    };
});
</script>

<template>
    <main class="px-2 lg:px-6">
        <LayoutContainer>
            <LayoutGrid
                as="div"
                class="pt-50 pb-21 lg:pb-50 gap-y-10 lg:gap-y-30"
            >
                <div
                    ref="refHeader"
                    class="col-span-full lg:col-start-2 lg:col-span-4 flex flex-col md:items-center gap-y-10"
                >
                    <div
                        ref="refTitle"
                        class="flex flex-col md:items-center gap-y-4"
                    >
                        <ConsoleOutput
                            size="sm"
                            color="muted"
                        >
                            {{ $t("pages.projects.header.prompt") }}
                        </ConsoleOutput>
                        <p class="font-display-md md:font-display-lg">
                            {{ $t("pages.projects.header.title") }}
                        </p>
                    </div>

                    <div
                        ref="refFilters"
                        class="z-1 w-full"
                    >
                        <ProjectsFilter
                            ref="refFilters"
                            v-model:deck="selectedDeck"
                            v-model:sort-by="selectedSortBy"
                            v-model:tag="selectedTag"
                            :deck-options="deckOptions"
                            :sort-by-options="sortByOptions"
                            :tag-options="tagOptions"
                        />
                    </div>
                </div>

                <div
                    ref="refCardsContainer"
                    class="col-span-full grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-6"
                >
                    <template v-if="filteredProjects.length === 0">
                        <ConsoleOutput
                            size="sm"
                            color="accent-2"
                            class="col-span-full justify-center"
                        >
                            {{ $t("pages.projects.noResults") }}
                        </ConsoleOutput>
                    </template>

                    <ProjectCard
                        v-for="project in filteredProjects"
                        :key="project.slug"
                        :project="project"
                        clickable
                        :filtered-badges="hasActiveFilters"
                        :hover-effect="!isMobileOrTablet"
                        class="lg:*:opacity-50 lg:hover:*:opacity-100 lg:*:transition-opacity lg:*:duration-500"
                        :style="{
                            transform: `rotate(${mapRange(useState(`${project.slug}-rotation`, () => Math.random()).value, 0, 1, -2, 2)}deg)`,
                        }"
                    />
                </div>
            </LayoutGrid>
        </LayoutContainer>
    </main>
</template>
