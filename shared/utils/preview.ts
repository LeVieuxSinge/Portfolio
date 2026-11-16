export function previewFrame(x: number, y: number, viewportWidth: number, viewportHeight: number, mediaWidth: number, mediaHeight: number) {
    const margin = 64;
    const maxHeight = Math.max(1, Math.min(300, viewportHeight - margin * 2));
    const width = Math.min(440, viewportWidth - margin * 2, maxHeight * mediaWidth / mediaHeight);
    const height = width * mediaHeight / mediaWidth;
    return {
        width, height, maxHeight,
        x: x + 36,
        y: y - height / 2,
    };
}
