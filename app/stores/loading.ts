export const useLoadingStore = defineStore("loading", () => {
    const isLoading = ref(false);
    const isPageTransitioning = ref(false);

    const loadingMessages = computed(() => [
        "loading.messages.01",
        "loading.messages.02",
        "loading.messages.03",
        "loading.messages.04",
        "loading.messages.05",
        "loading.messages.06",
        "loading.messages.07",
        "loading.messages.08",
        "loading.messages.09",
        "loading.messages.10",
        "loading.messages.11",
        "loading.messages.12",
        "loading.messages.13",
        "loading.messages.14",
        "loading.messages.15",
        "loading.messages.16",
    ]);

    return {
        isLoading,
        isPageTransitioning,
        loadingMessages,
    };
});
