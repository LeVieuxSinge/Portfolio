/** Shell-owned route phases; entry-loader and modal presentation phases remain local to their owners. */
export type NavigationPhase = "idle" | "navigating" | "page-covering" | "page-covered" | "page-preparing" | "page-revealing" | "menu-covered" | "menu-preparing" | "menu-revealing";

/**
 * Declare the shared navigation phase once per Nuxt request/application.
 * @returns The internal writable ref; the client navigation controller is its only writer.
 */
export function useNavigationState() {
    return useState<NavigationPhase>("navigation-phase", () => "idle");
}
