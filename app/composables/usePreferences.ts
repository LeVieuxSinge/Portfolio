import { useStorage } from "@vueuse/core";

export const usePreferences = createGlobalState(() => {
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const theme = useStorage<"dark" | "light">("portfolio-theme", "dark");

    const toggleTheme = () => {
        theme.value = theme.value === "dark" ? "light" : "dark";
    };

    const toggleLocale = async () => {
        await navigateTo(switchLocalePath(locale.value === "fr" ? "en" : "fr"), { replace: true });
    };

    return {
        locale,
        theme,
        toggleLocale,
        toggleTheme,
    };
});
