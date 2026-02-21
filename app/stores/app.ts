export const useAppStore = defineStore("app", () => {
    const language = computed(() => useI18n().locale.value);

    function setLanguage(lang: "en" | "fr") {
        useI18n().setLocale(lang);
    }

    return {
        language,
        setLanguage,
    };
});
