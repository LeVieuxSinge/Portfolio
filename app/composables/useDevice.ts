export function useDevice() {
    const breakpoints = useBreakpoints();
    const isMobile = breakpoints.smaller("md");
    const isTablet = breakpoints.between("md", "lg");
    const isDesktop = breakpoints.greater("lg");

    const isMobileOrTablet = computed(() => isMobile.value || isTablet.value);
    const isDesktopOrTablet = computed(() => isDesktop.value || isTablet.value);

    return { isMobile, isTablet, isDesktop, isMobileOrTablet, isDesktopOrTablet };
}
