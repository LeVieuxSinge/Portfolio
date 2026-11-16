export function useMenu() {
    const isOpen = useState<boolean>("menu-open", () => false);

    function toggle() {
        isOpen.value = !isOpen.value;
    }

    return {
        isOpen,
        toggle,
    };
}
