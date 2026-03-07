<script setup lang="ts">
import { animate, mapRange, onScroll } from "animejs";

definePageMeta({
    name: "projects",
});

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

onMounted(() => {
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
    const container = document.querySelector("body");
    const header = unref(refHeader);
    const title = unref(refTitle);
    const filters = unref(refFilters);
    if (header && title && filters && container) {
        animate(title, {
            translateY: ["0px", "140px"],
            ease: "linear",
            autoplay: onScroll({
                container: container,
                target: header,
                enter: "top+=15% top",
                leave: "top+=5% bottom",
                sync: 0.6,
            }),
        });

        animate(filters, {
            translateY: ["0px", "60px"],
            ease: "linear",
            autoplay: onScroll({
                container: container,
                target: header,
                enter: "top+=15% top",
                leave: "top+=5% bottom",
                sync: 0.6,
            }),
        });
    };
});
</script>

<template>
    <LayoutGrid
        as="div"
        class="pt-50 pb-50 gap-y-30"
    >
        <div
            ref="refHeader"
            class="col-start-2 col-span-4 flex flex-col items-center gap-y-10"
        >
            <div
                ref="refTitle"
                class="flex flex-col items-center gap-y-4"
            >
                <ConsoleOutput
                    size="sm"
                    color="muted"
                >
                    {{ $t("projects.header.prompt") }}
                </ConsoleOutput>
                <p class="font-display-lg">
                    {{ $t("projects.header.title") }}
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
            class="col-span-full grid grid-cols-3 gap-6"
        >
            <template v-if="filteredProjects.length === 0">
                <ConsoleOutput
                    size="sm"
                    color="accent-2"
                    class="col-span-full text-center"
                >
                    No projects found with the selected filters.
                </ConsoleOutput>
            </template>

            <ProjectCard
                v-for="project in filteredProjects"
                :key="project.slug"
                :project="project"
                :clickable="true"
                :filtered-badges="hasActiveFilters"
                :style="{
                    transform: `rotate(${mapRange(useState(`${project.slug}-rotation`, () => Math.random()).value, 0, 1, -2, 2)}deg)`,
                }"
            />
        </div>
    </LayoutGrid>
</template>
