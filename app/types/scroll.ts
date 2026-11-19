export type ScrollTarget = number | string | HTMLElement;
export interface ScrollMoveOptions { immediate?: boolean }

/** Vertical position is in CSS pixels; progress is a clamped 0–100 percentage. */
export interface ScrollSnapshot { y: number; progress: number; introEnd: number }
