export function useMenu() {
    const isOpen = useState<boolean>("menu-open", () => false);
    const isPageRevealing = useState<boolean>("menu-page-revealing", () => false);

    function toggle() {
        isOpen.value = !isOpen.value;
    }

    return {
        isOpen,
        isPageRevealing,
        toggle,
    };
}
