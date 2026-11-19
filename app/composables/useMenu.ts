export function useMenu() {
    const isOpen = useState<boolean>("menu-open", () => false);

    return {
        isOpen,
    };
}
