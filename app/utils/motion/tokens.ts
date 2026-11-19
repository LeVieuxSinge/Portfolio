/** Animation durations in milliseconds; reduced motion bypasses decorative movement. */
export const motionDurations = {
    /** Minimum first-paint percentage progression; match the CSS counter's 2s duration. */
    entryProgress: 2000,
    /** Loader/menu background exit after content preparation. */
    overlayExit: 500,

    /** Outgoing document-cover entrance before a regular route commits. */
    pageCover: 280,
    /** Destination cover/menu-background fade after readiness. */
    pageReveal: 400,

    /** Menu background entrance; row sequencing has its own duration/stagger. */
    menuBackground: 360,
    /** Whole-row entrance duration, including separators. */
    menuRows: 520,
    /** Whole-row upward exit duration, before the background finishes. */
    menuRowsExit: 280,

    /** Common element/list-row entrance; pointer hit-testing follows this settling window. */
    reveal: 700,
    /** Display-heading character entrance; accessible source text is retained. */
    title: 800,
    /** In-place Archive filter/sort layout change. */
    listLayout: 450,
    /** Menu line/cross interpolation, independent of Teleport reparenting. */
    icon: 400,
} as const;

/** Message IDs are shared by both locales; order is shuffled once and serialized by SSR. */
export const entryMessages = {
    /** Complete retained message corpus, addressed by IDs 1 through 16. */
    count: 16,
    /** Time between history insertions in milliseconds; no artificial readiness task. */
    interval: 800,

    /** Maximum visible lines; the final five hold after the corpus is exhausted. */
    history: 5,
} as const;
