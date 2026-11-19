/** Animation durations in milliseconds; reduced motion bypasses decorative movement. */
export const motionDurations = {
    entryProgress: 2000,
    overlayExit: 500,
    pageCover: 280,
    pageReveal: 400,
    menuBackground: 360,
    menuRows: 520,
    menuRowsExit: 280,
    reveal: 700,
    title: 800,
    listLayout: 450,
    icon: 400,
} as const;

export const entryMessages = { count: 16, interval: 800, history: 5 } as const;
