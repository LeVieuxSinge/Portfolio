import type { Ref } from "vue";

/**
 * Shrink a single-line display label only when it exceeds its parent; preserve content and the stylesheet's intended base size.
 * @param element Display span measured after mounting and local-font readiness.
 * @returns fit, a coalesced requestAnimationFrame measurement; a null unmounted ref makes late requests harmless.
 */
export function useFitText(element: Ref<HTMLElement | null>) {
    let frame = 0;

    /**
     * Replace the queued measurement, clear a previous override, then proportionally reduce font size to the available CSS-pixel width.
     */
    function fit() {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
            const target = element.value;

            if (!target?.parentElement) return;
            target.style.fontSize = "";

            const width = target.getBoundingClientRect().width;
            const available = target.parentElement.clientWidth;

            if (width > available && available > 0) {
                target.style.fontSize = `${Number.parseFloat(getComputedStyle(target).fontSize) * available / width}px`;
            }
        });
    }

    useResizeObserver(() => element.value?.parentElement, fit);

    onMounted(() => {
        fit();
        void document.fonts.ready.then(fit);
    });
    onBeforeUnmount(() => cancelAnimationFrame(frame));

    return { fit };
}
