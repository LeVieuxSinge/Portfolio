export function useLocale() {
    const { locale } = useI18n();
    const switchLocalePath = useSwitchLocalePath();
    const { isPageTransitioning } = useLoading();

    /**
     * Custom switch locale function that forces a full page reload to ensure all content is properly updated.
     * Implemented due to issues with animated text elements.
     */
    async function switchLocale() {
        isPageTransitioning.value = true;
        setTimeout(() => {
            navigateTo(switchLocalePath(locale.value === "fr" ? "en" : "fr"), { replace: true });
        }, 500); // Delay to allow transition effect before navigation
    }

    return {
        locale,
        switchLocale,
    };
};
