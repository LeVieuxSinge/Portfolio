import "lenis/dist/lenis.css";
import { createDocumentScroll } from "~/utils/scroll";
import type { DocumentScroller } from "~/utils/scroll";

/** Install one document-scroll owner; all overlay locks and router restoration converge here. */
export default defineNuxtPlugin<{ scroll: DocumentScroller }>((app) => {
    const { isOpen } = useMenu();
    const { isLoading } = useLoading();
    const { pageCovered } = usePageTransition();

    const locked = computed(() => isOpen.value || isLoading.value || pageCovered.value);

    const scroll = createDocumentScroll(app, useScrollState(), locked);

    if (import.meta.hot) import.meta.hot.dispose(scroll.dispose);
    app.vueApp.onUnmount(scroll.dispose);

    return { provide: { scroll } };
});
