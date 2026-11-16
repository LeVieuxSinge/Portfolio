export function previewFrame(x: number, y: number, viewportWidth: number, viewportHeight: number, mediaWidth: number, mediaHeight: number) {
    const margin = 64;
    const width = Math.min(440, viewportWidth - margin * 2);
    const maxHeight = Math.max(1, Math.min(300, viewportHeight - margin * 2));
    const height = Math.min(maxHeight, width * mediaHeight / mediaWidth);
    return {
        width, height, maxHeight,
        x: Math.max(margin, Math.min(x - width / 2, viewportWidth - width - margin)),
        y: Math.max(margin, Math.min(y - 44 - height, viewportHeight - height - margin)),
    };
}
