import type { Ref } from "vue";
import type { ScrollSnapshot } from "~/types/scroll";

/**
 * Declare shared CSS-pixel position, percentage, and intro-end refs for the sole scroll owner.
 * @returns Internal writable refs; consumers use the read-only useDocumentScroll facade.
 */
export function useScrollState(): { [Key in keyof ScrollSnapshot]: Ref<ScrollSnapshot[Key]> } {
    return {
        y: useState<number>("document-scroll-y", () => 0),
        progress: useState<number>("document-scroll-progress", () => 0),
        introEnd: useState<number>("document-scroll-intro-end", () => 0),
    };
}
