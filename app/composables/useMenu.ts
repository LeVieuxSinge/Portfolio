export function useMenu() {
    const isOpen = useState(() => false);

    function toggle() {
        isOpen.value = !isOpen.value;
    }

    return {
        isOpen,
        toggle,
    };
}
