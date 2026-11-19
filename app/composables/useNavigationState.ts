export type NavigationPhase = "idle" | "navigating" | "page-covering" | "page-covered" | "page-preparing" | "page-revealing" | "menu-covered" | "menu-preparing" | "menu-revealing";

/** Internal state: only the shell navigation controller writes this phase. */
export function useNavigationState() {
    return useState<NavigationPhase>("navigation-phase", () => "idle");
}
