/**
 * Share modal visibility so scrolling, media, and the shell can suspend interaction.
 * @returns isOpen; only modal coordination should request changes to this shared flag.
 */
export function useMenu() {
    const isOpen = useState<boolean>("menu-open", () => false);

    return {
        isOpen,
    };
}
