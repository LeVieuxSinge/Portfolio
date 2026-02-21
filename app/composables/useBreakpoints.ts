import { useBreakpoints as _, breakpointsTailwind } from "@vueuse/core";

export const useBreakpoints = createSharedComposable(() => {
    const breakpoints = _(breakpointsTailwind);
    const isMobile = breakpoints.smaller("md");
    const isTablet = breakpoints.between("md", "lg");
    const isDesktop = breakpoints.greater("lg");
    return { isMobile, isTablet, isDesktop };
});
