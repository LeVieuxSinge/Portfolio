/** CSS-pixel offset, CSS selector, or element resolved by the document-scroll owner. */
export type ScrollTarget = number | string | HTMLElement;

/** Movement policy; route restoration uses immediate movement beneath a cover. */
export interface ScrollMoveOptions {
    /** Jump immediately and permit restoration while the document owner is suspended. */
    immediate?: boolean;
}

/** Vertical position is in CSS pixels; progress is a clamped 0–100 percentage. */
export interface ScrollSnapshot {
    /** Non-negative vertical document offset in CSS pixels. */
    y: number;
    /** Offset divided by the actual content-end limit, clamped to 0–100. */
    progress: number;

    /** Scroll-down destination/header-label threshold, clamped to the content end. */
    introEnd: number;
}
