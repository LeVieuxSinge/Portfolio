enum ESortBy {
    FEATURED = "featured",
    NAME = "name",
    YEAR = "year",
}

export interface FilterOption {
    label: string;
    value: string;
}

export function useFilters() {
    const { tools, roles, resolvedDecks, resolvedProjects } = useProjectsData();

    const deckOptions = useState<FilterOption[]>("filtersDeckOptions", () => resolvedDecks.map(deck => ({ label: deck.label, value: deck.id })));
    const sortByOptions = useState<FilterOption[]>("filtersSortByOptions", () => Object.values(ESortBy).map(value => ({ label: `filter.sortBy.${value}`, value })));
    const tagOptions = useState<FilterOption[]>("filtersTagOptions", () => [
        ...tools.map(tool => ({ label: tool.name, value: tool.id })),
        ...roles.map(role => ({ label: role.name, value: role.id })),
        ...resolvedProjects.map(project => ({ label: project.year, value: project.year })).filter((option, index, self) => index === self.findIndex(o => o.value === option.value)), // Unique years
    ]);

    const selectedDeck = useState<FilterOption[]>("filtersSelectedDeck", () => []);
    const selectedSortBy = useState<FilterOption[]>("filtersSelectedSortBy", () => []);
    const selectedTag = useState<FilterOption[]>("filtersSelectedTag", () => []);

    const hasActiveFilters = computed(() => selectedDeck.value.length > 0 || selectedSortBy.value.length > 0 || selectedTag.value.length > 0);

    return {
        deckOptions,
        sortByOptions,
        tagOptions,
        selectedDeck,
        selectedSortBy,
        selectedTag,
        hasActiveFilters,
    };
}
