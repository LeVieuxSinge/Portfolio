import type { Ref } from "vue";

export function useFitText(element: Ref<HTMLElement | null>) {
    let frame = 0;
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
