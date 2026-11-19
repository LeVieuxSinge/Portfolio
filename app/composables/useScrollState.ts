import type { Ref } from "vue";
import type { ScrollSnapshot } from "~/types/scroll";

/** Internal shared declarations used by the scroll owner and its read-only facade. */
export function useScrollState(): { [Key in keyof ScrollSnapshot]: Ref<ScrollSnapshot[Key]> } {
    return {
        y: useState<number>("document-scroll-y", () => 0),
        progress: useState<number>("document-scroll-progress", () => 0),
        introEnd: useState<number>("document-scroll-intro-end", () => 0),
    };
}
