/** Shared geometry keeps previews aligned with the enlarged cursor over linked rows. */
export const cursorGeometry = {
    /** Base cursor diameter in CSS pixels. */
    diameter: 48,
    /** Unitless enlargement over links/buttons; preview offset uses this radius. */
    hoverScale: 1.5,
} as const;

/**
 * Size a preview from intrinsic proportions and place its left center at the cursor's right center.
 * @param x Pointer x-coordinate in viewport CSS pixels.
 * @param y Pointer y-coordinate in viewport CSS pixels.
 * @param viewportWidth Viewport CSS-pixel width; size does not depend on distance to its edges.
 * @param viewportHeight Viewport CSS-pixel height.
 * @param mediaWidth Intrinsic media width in pixels.
 * @param mediaHeight Intrinsic media height in pixels; must be positive.
 * @returns CSS-pixel geometry. Position intentionally overflows the viewport instead of shrinking near an edge.
 */
export function previewFrame(x: number, y: number, viewportWidth: number, viewportHeight: number, mediaWidth: number, mediaHeight: number) {
    const margin = 64;
    const maxHeight = Math.max(1, Math.min(300, viewportHeight - margin * 2));
    const width = Math.min(440, viewportWidth - margin * 2, maxHeight * mediaWidth / mediaHeight);
    const height = width * mediaHeight / mediaWidth;

    return {
        width, height, maxHeight,
        x: x + cursorGeometry.diameter / 2 * cursorGeometry.hoverScale,
        y: y - height / 2,
    };
}
