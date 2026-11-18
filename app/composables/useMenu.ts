export function useMenu() {
    const isOpen = useState<boolean>("menu-open", () => false);
    const isPageRevealing = useState<boolean>("menu-page-revealing", () => false);

    return {
        isOpen,
        isPageRevealing,
    };
}
