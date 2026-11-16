export function usePageTransition() {
    const isNavigating = useState<boolean>("page-navigating", () => false);
    return { isNavigating };
}
